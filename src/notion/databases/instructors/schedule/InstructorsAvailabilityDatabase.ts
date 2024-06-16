import AbstractNotionDatabase from '../../AbstractNotionDatabase';
import { IInstructorsAvailabilityDatabase, IInstructorsDatabase } from '../types/interfaces';
import InstructorsDatabase from '../InstructorsDatabase';
import { NotionTextType, NotionUserId } from '../../../types/types';
import { InstructorAvailabilityDatabasePageSchema } from '../types/types';
import {
  CreatePageResponse,
  DatePropertyItemObjectResponse,
  PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

export default class InstructorsAvailabilityDatabase
  extends AbstractNotionDatabase
  implements IInstructorsAvailabilityDatabase
{
  protected instructorsDatabase: IInstructorsDatabase;

  constructor() {
    super(process.env.NOTION_AVAILABLE_INSTRUCTORS_DATES_DATABASE_ID);

    this.instructorsDatabase = new InstructorsDatabase();
  }

  public async fillInstructorAvailableDates(instructorId: NotionUserId): Promise<void> {
    const instructorAvailableDates = await this.instructorsDatabase.getInstructorAvailableDatesByUserId(instructorId);
    const instructorName = await this.instructorsDatabase.getInstructorNameByUserId(instructorId);

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
        database_id: process.env.NOTION_AVAILABLE_INSTRUCTORS_DATES_DATABASE_ID as string
      },
      properties: {
        Дата: {
          date: {
            start: date
          }
        },
        Інструктори: {
          rich_text: [
            {
              text: {
                content: name // Replace with your description text
              }
            }
          ]
        }
      }
    };
  }

  protected async clearInstructorAvailableDates(instructorId: NotionUserId): Promise<void> {
    const databaseResults = await this.getDatabaseResults();
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
