import { INotionPage } from './types/interfaces';

export default abstract class AbstractNotionPage implements INotionPage {
  public async getPageDatabases(): Promise<void> {}
}
