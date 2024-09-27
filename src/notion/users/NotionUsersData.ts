import { PersonUserObjectResponse, UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { injectable } from 'inversify';
import { INotionClient } from '../client/types/interfaces';
import { INotionUsersData } from './types/interfaces';
import { UserNamesByNotionId } from './types/types';
import DefaultNotionClient from '../client/implementations/DefaultNotionClient';

@injectable()
export default class NotionUsersData implements INotionUsersData {
  private notionClient: INotionClient = new DefaultNotionClient();

  public async getAllUsers(): Promise<UserObjectResponse[]> {
    const result = await this.notionClient.users.list({});

    return result.results;
  }

  public async getAllUsersWithPersonType(): Promise<PersonUserObjectResponse[]> {
    const allUsersList = await this.getAllUsers();

    return allUsersList.filter(({ type }) => type === 'person') as PersonUserObjectResponse[];
  }

  public async getAllUsersWithPersonTypeNamesById(): Promise<UserNamesByNotionId> {
    const usersWithPersonType = await this.getAllUsersWithPersonType();
    const namesById: UserNamesByNotionId = {};

    for (let i = 0; i < usersWithPersonType.length; i++) {
      const { id, name } = usersWithPersonType[i];

      if (!name) {
        console.error(`No name found for user with id - ${id}`);

        continue;
      }

      namesById[id] = name;
    }

    return namesById;
  }
}
