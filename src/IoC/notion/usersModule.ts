import { ContainerModule, interfaces } from 'inversify';
import { Types } from '../Types';
import NotionUsersData from '../../notion/users/NotionUsersData';
import { INotionUsersData } from '../../notion/users/types/interfaces';

export const usersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<INotionUsersData>(Types.NotionUsersData).to(NotionUsersData);
});
