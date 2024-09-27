import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { injectable } from 'inversify';
import { INotionPage } from './types/interfaces';
import { NotionDatabaseId } from '../databases/types/types';
import { InstructorNotionPageId } from './types/types';
import { INotionClient } from '../client/types/interfaces';
import DefaultNotionClient from '../client/implementations/DefaultNotionClient';

@injectable()
export default abstract class AbstractNotionPage implements INotionPage {
  protected readonly pageId: InstructorNotionPageId;

  protected readonly notionClient: INotionClient = new DefaultNotionClient();

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
