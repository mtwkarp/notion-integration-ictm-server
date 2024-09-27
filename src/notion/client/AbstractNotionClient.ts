import { Client } from '@notionhq/client';
import { injectable } from 'inversify';
import { INotionClient } from './types/interfaces';

@injectable()
export default class AbstractNotionClient extends Client implements INotionClient {
  constructor() {
    super({ auth: process.env.NOTION_KEY });
  }
}
