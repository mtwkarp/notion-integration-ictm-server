import AbstractNotionDatabase from '../../AbstractNotionDatabase';
import { IInstructorsAvailabilityDatabase, IInstructorsDatabase } from '../types/interfaces';
import InstructorsDatabase from '../InstructorsDatabase';
import { NotionUserId } from '../../../types/types';
import { InstructorAvailabilityDatabasePageSchema } from '../types/types';
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints';

export default class InstructorsAvailabilityDatabase
  extends AbstractNotionDatabase
  implements IInstructorsAvailabilityDatabase
{
  protected instructorsDatabase: IInstructorsDatabase;

  constructor() {
    super(process.env.NOTION_AVAILABLE_INSTRUCTORS_DATES_DATABASE_ID);

    this.instructorsDatabase = new InstructorsDatabase();

    this.fillInstructorAvailableDates(process.env.NOTION_MY_ID as string);
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
      const responses = await Promise.all(pageCreationResponses);
      console.log('Pages created successfully:', responses);
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
}
