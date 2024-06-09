import { INotionPage } from './types/interfaces';
import { NotionDatabaseId } from '../databases/types/types';
import { Client } from '@notionhq/client';
import InstructorsDatabase from '../databases/instructors/InstructorsDatabase';
import { InstructorNotionPageId } from './types/types';

export default abstract class AbstractNotionPage implements INotionPage {
  protected readonly databaseId: InstructorNotionPageId;
  protected notionClient: Client = new Client({ auth: process.env.NOTION_KEY });

  constructor(databaseId?: NotionDatabaseId) {
    if (databaseId) {
      this.databaseId = databaseId;
    }
  }

  public get id(): NotionDatabaseId {
    return this.databaseId;
  }

  public async getPageDatabases(): Promise<void> {}
}
