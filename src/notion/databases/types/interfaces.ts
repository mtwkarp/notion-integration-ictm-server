import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { DatabaseResult, NotionDatabaseId } from './types';

export interface INotionDatabase {
  id: NotionDatabaseId;
  queryDatabase(): Promise<QueryDatabaseResponse> | never;
  getDatabaseResults(): Promise<DatabaseResult>;
}
