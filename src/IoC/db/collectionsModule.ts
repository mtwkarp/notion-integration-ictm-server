import { ContainerModule, interfaces } from 'inversify';
import { Types } from '../Types';
import {
  IUsersCollection,
  IUsersOccupationCollection,
  IUsersScheduleCollection,
} from '../../db/collections/implementations/types/interfaces';
import UsersScheduleCollection from '../../db/collections/implementations/UsersScheduleCollection';
import UsersOccupationCollection from '../../db/collections/implementations/UsersOccupationCollection';
import UsersCollection from '../../db/collections/implementations/UsersCollection';

export const collectionsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUsersCollection>(Types.UsersCollection).to(UsersCollection);
  bind<IUsersOccupationCollection>(Types.UsersOccupationCollection).to(UsersOccupationCollection).inSingletonScope();
  bind<IUsersScheduleCollection>(Types.UsersScheduleCollection).to(UsersScheduleCollection);
});
