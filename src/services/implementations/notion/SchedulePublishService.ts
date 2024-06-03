import AbstractService from '../../AbstractService';
import { Client } from '@notionhq/client';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export default class SchedulePublishService extends AbstractService {
  protected notionClient: Client;
  constructor() {
    super();
    this.initNotionClient();
  }

  protected async initNotionClient(): Promise<void> {
    this.notionClient = new Client({ auth: process.env.NOTION_KEY });
    this.getDatabase();
  }

  protected async getDatabase(): Promise<void> {
    try {
      const response = await this.notionClient.databases.query({
        database_id: process.env.NOTION_INSTRUCTORS_DATABASE_ID as string
      });
      const response1 = await this.notionClient.users.list({});
      // @ts-ignore
      console.log(response1.results);

      response.results.forEach((el) => {
        this.getInstructorPageById(el.id);
        // this.getAvailabilityDatabase(el.id);
      });
    } catch (error) {
      console.error(error);
    }
  }

  protected async getInstructorPageById(pageId: string): Promise<void> {
    try {
      const response: PageObjectResponse = (await this.notionClient.pages.retrieve({
        page_id: pageId
      })) as PageObjectResponse;

      // @ts-ignore
      // console.log(response.properties.Person.people)
    } catch (error) {
      console.error(error);
    }
  }

  protected async getAvailabilityDatabase(instructorPageId: string): Promise<void> {
    const blocksRes = await this.notionClient.blocks.children.list({ block_id: instructorPageId });
    const res = blocksRes.results as BlockObjectResponse[];

    res.forEach((el): void => {
      if (el.type === 'child_database' && el.child_database.title === 'Taблиця доступності') {
        console.log(el.child_database);
      }
    });
  }
}
