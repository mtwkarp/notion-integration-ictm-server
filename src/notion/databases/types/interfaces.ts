import { DatabaseResult, NotionDatabaseId } from './types';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export interface INotionDatabase {
  id: NotionDatabaseId;
  queryDatabase(): Promise<QueryDatabaseResponse> | never;
  getDatabaseResults(): Promise<DatabaseResult>;
}
