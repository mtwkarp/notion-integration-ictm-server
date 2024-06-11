import { PersonUserObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { INotionUserObject } from '../types/interfaces';
import { NotionUserEmail, NotionUserId, NotionUserName } from '../../../types/types';

export default class NotionUserObject implements INotionUserObject {
  protected notionUserObject: PersonUserObjectResponse;

  constructor(userObject: PersonUserObjectResponse) {
    this.notionUserObject = userObject;
  }

  public getUserId(): NotionUserId {
    return this.notionUserObject.id;
  }

  public getEmail(): NotionUserEmail | undefined {
    return this.notionUserObject.person.email;
  }

  public getUserName(): NotionUserName | null {
    return this.notionUserObject.name;
  }
}
