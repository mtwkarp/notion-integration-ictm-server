import dotenv from 'dotenv';
import 'reflect-metadata';
import { Types } from './IoC/Types';
import { IDatabase } from './db/types/interfacets';
import dependenciesContainer from './IoC/dependenciesContainer';
import { initServer } from './server';

dotenv.config();

const db: IDatabase = dependenciesContainer.get(Types.Database);
db.init();

initServer();
