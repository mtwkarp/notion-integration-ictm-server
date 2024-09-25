import { INotionClient } from './types/interfaces';
import { Client } from '@notionhq/client';

export default class AbstractNotionClient extends Client implements INotionClient {
  constructor() {
    super({ auth: process.env.NOTION_KEY });
  }
}
