import { ContainerModule, interfaces } from 'inversify';
import { Types } from '../Types';
import Database from '../../db/Database';
import { IDatabase } from '../../db/types/interfacets';

export const databaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IDatabase>(Types.Database).to(Database);
});
