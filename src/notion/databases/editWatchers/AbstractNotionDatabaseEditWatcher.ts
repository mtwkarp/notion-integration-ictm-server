import { INotionDatabaseEditWatcher } from './types/interfaces';
import { injectable } from 'inversify';
import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { IObserverHolder } from './types/types';

@injectable()
export default abstract class AbstractNotionDatabaseEditWatcher
  extends AbstractNotionDatabase
  implements INotionDatabaseEditWatcher
{
  protected observers: IObserverHolder[] = [];
  protected watchInterval: ReturnType<typeof setInterval>;
  protected isIntervalActive: boolean = false;
  protected lastEditedTime: string = '';

  public runWatchInterval(): void {
    if (this.isIntervalActive) {
      console.warn('The interval already active');
      return;
    }

    this.watchInterval = setInterval(this.checkForEdits.bind(this), 1000);
    this.isIntervalActive = true;
  }

  public stopWatchInterval(): void {
    if (!this.isIntervalActive) {
      console.warn('The interval in not active');
      return;
    }

    clearInterval(this.watchInterval);
    this.isIntervalActive = false;
  }

  protected async checkForEdits(): Promise<void> {
    const query = await this.queryDatabase();
    const { results } = query;

    results.forEach((result) => {
      // if
    });
  }

  public subscribeObserver(cb: Function, context: object): void {
    this.observers.push({ cb, context });
  }

  public unsubscribeObserver(cb: Function, context: object): void {
    const targetObservers = this.observers.filter((observer) => {
      return observer.cb === cb && observer.context === context;
    });

    targetObservers.forEach((observer) => {
      this.observers.splice(this.observers.indexOf(observer), 1);
    });
  }
}
