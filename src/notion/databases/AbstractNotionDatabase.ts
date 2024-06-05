import { INotionDatabase } from './types/interfaces';
import { DatabaseResult, NotionDatabaseId } from './types/types';
import { Client } from '@notionhq/client';
import { injectable } from 'inversify';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

@injectable()
export default abstract class AbstractNotionDatabase implements INotionDatabase {
  protected readonly databaseId: NotionDatabaseId;
  protected notionClient: Client = new Client({ auth: process.env.NOTION_KEY });

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
        database_id: this.databaseId
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
