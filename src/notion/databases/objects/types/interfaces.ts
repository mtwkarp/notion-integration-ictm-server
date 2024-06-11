import { NotionUserEmail, NotionUserId, NotionUserName } from '../../../types/types';

export interface INotionUserObject {
  getUserId(): NotionUserId;
  getUserName(): NotionUserName | null;
  getEmail(): NotionUserEmail | undefined;
}
