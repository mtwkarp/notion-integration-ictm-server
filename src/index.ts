import dotenv from 'dotenv';
import 'reflect-metadata';
import Database from './db/Database';

dotenv.config();
new Database().init();

import './server';
