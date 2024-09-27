import {
  CreatePageResponse,
  DatePropertyItemObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { inject, injectable } from 'inversify';
import AbstractNotionDatabase from '../../AbstractNotionDatabase';
import { IInstructorsAvailabilityNDB, IInstructorsNDB } from '../types/interfaces';
import { NotionTextType, NotionUserId } from '../../../types/types';
import { InstructorAvailabilityDatabasePageSchema } from '../types/types';
import { Types } from '../../../../IoC/Types';

@injectable()
export default class InstructorsAvailabilityNDB extends AbstractNotionDatabase implements IInstructorsAvailabilityNDB {
  protected instructorsNDB: IInstructorsNDB;

  constructor(@inject(Types.InstructorsNDB) instructorsNDB: IInstructorsNDB) {
    super(process.env.NOTION_AVAILABLE_INSTRUCTORS_DATES_DATABASE_ID);

    this.instructorsNDB = instructorsNDB;
  }

  public async fillInstructorAvailableDates(instructorId: NotionUserId): Promise<void> {
    const instructorAvailableDates = await this.instructorsNDB.getInstructorAvailableDatesByUserId(instructorId);
    const instructorName = await this.instructorsNDB.getInstructorNameByUserId(instructorId);

    const pageCreationResponses: Promise<CreatePageResponse>[] = [];

    instructorAvailableDates.forEach((instructorAvailableDate) => {
      const schema = this.createPageSchemaFromAvailableDate(instructorAvailableDate, instructorName);
      pageCreationResponses.push(this.createAvailabilityPage(schema));
    });

    try {
      await Promise.all(pageCreationResponses);
      console.log(`Instructor availability pages created successfully. Instructor name - ${instructorName}`);
    } catch (error) {
      console.error('Error creating pages:', error);
    }
  }

  protected async createAvailabilityPage(schema: InstructorAvailabilityDatabasePageSchema): Promise<CreatePageResponse> {
    return this.notionClient.pages.create(schema);
  }

  protected createPageSchemaFromAvailableDate(date: string, name: string): InstructorAvailabilityDatabasePageSchema {
    return {
      parent: {
        database_id: process.env.NOTION_AVAILABLE_INSTRUCTORS_DATES_DATABASE_ID as string,
      },
      properties: {
        Дата: {
          date: {
            start: date,
          },
        },
        Інструктори: {
          rich_text: [
            {
              text: {
                content: name, // Replace with your description text
              },
            },
          ],
        },
      },
    };
  }

  public async getAvailableInstructorNamesByDate(date: string): Promise<string> {
    const databaseResults = (await this.getDatabaseResults()) as PageObjectResponse[];
    let instructorNames: string = '';
    let availabilityPageByDate: PageObjectResponse | undefined;

    for (let i = 0; i < databaseResults.length; i++) {
      const page = databaseResults[i];
      const dateProperty = page.properties['Дата'] as DatePropertyItemObjectResponse;

      if (dateProperty) {
        const datePropertyValue = dateProperty.date?.start;

        if (datePropertyValue === date) {
          availabilityPageByDate = page;

          break;
        }
      }
    }

    if (availabilityPageByDate) {
      const textProperty = availabilityPageByDate.properties['Інструктори'] as NotionTextType;

      instructorNames = textProperty.rich_text[0].plain_text;
    } else {
      instructorNames = 'На дану дату ніхто з інструкторів не доступний.';
    }

    return instructorNames;
  }
}
