import { PersonUserObjectResponse, UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { UserNamesByNotionId } from './types';

export interface INotionUsersData {
  getAllUsers(): Promise<UserObjectResponse[]>;
  getAllUsersWithPersonType(): Promise<PersonUserObjectResponse[]>;
  getAllUsersWithPersonTypeNamesById(): Promise<UserNamesByNotionId>;
}
