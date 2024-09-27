import { Container, interfaces } from 'inversify';
import { servicesModule } from './services/servicesModule';
import { controllersModule } from './controllers/controllersModule';
import { databaseModule } from './db/databaseModule';
import { clientModule } from './notion/clientModule';
import { pagesModule } from './notion/pagesModule';
import { usersModule } from './notion/usersModule';
import { ndbModule } from './notion/ndbModule';
import { collectionsModule } from './db/collectionsModule';

const dependenciesContainer: interfaces.Container = new Container();

dependenciesContainer.load(
  servicesModule,
  controllersModule,
  collectionsModule,
  databaseModule,
  clientModule,
  ndbModule,
  pagesModule,
  usersModule,
);

export default dependenciesContainer;
