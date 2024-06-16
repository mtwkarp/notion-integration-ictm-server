import { INotionPage } from './types/interfaces';
import { NotionDatabaseId } from '../databases/types/types';
import { Client } from '@notionhq/client';
import InstructorsDatabase from '../databases/instructors/InstructorsDatabase';
import { InstructorNotionPageId } from './types/types';
import { DatePropertyItemObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionTextType } from '../types/types';

export default abstract class AbstractNotionPage implements INotionPage {
  protected readonly pageId: InstructorNotionPageId;
  protected notionClient: Client = new Client({ auth: process.env.NOTION_KEY });

  constructor(pageId?: NotionDatabaseId) {
    if (pageId) {
      this.pageId = pageId;
    }
  }

  public get id(): NotionDatabaseId {
    return this.pageId;
  }

  protected async retrievePage(): Promise<PageObjectResponse> {
    try {
      return (await this.notionClient.pages.retrieve({ page_id: this.pageId })) as PageObjectResponse;
    } catch (error) {
      throw new Error(`Could not retrieve page: ${error}`);
    }
  }
}
