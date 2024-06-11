import { PersonUserObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export type NotionUserId = string;
export type NotionUserName = string;
export type NotionUserEmail = string;
export type NotionPersonType = {
  id: string;
  type: string;
  people: Array<PersonUserObjectResponse> | [];
};
