import { injectable } from 'inversify';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { DatabaseResult, NotionDatabaseId } from './types/types';
import { INotionDatabase } from './types/interfaces';
import { INotionClient } from '../client/types/interfaces';
import DefaultNotionClient from '../client/implementations/DefaultNotionClient';

@injectable()
export default abstract class AbstractNotionDatabase implements INotionDatabase {
  protected readonly databaseId: NotionDatabaseId;

  protected notionClient: INotionClient = new DefaultNotionClient();

  constructor(databaseId?: NotionDatabaseId) {
    if (databaseId) {
      this.databaseId = databaseId;
    }
  }

  public get id(): NotionDatabaseId {
    return this.databaseId;
  }

  public async queryDatabase(): Promise<QueryDatabaseResponse> | never {
    try {
      return await this.notionClient.databases.query({
        database_id: this.databaseId,
      });
    } catch (error) {
      throw new Error(`Something went wrong while trying to queryDatabase - ${error}, database id - ${this.databaseId}`);
    }
  }

  public async getDatabaseResults(): Promise<DatabaseResult> {
    const database = await this.queryDatabase();

    return database.results;
  }
}
