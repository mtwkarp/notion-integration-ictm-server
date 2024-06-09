import { INotionDatabaseEditWatcher } from './types/interfaces';
import { injectable } from 'inversify';
import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { IObserverHolder } from './types/types';
import { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

@injectable()
export default abstract class AbstractNotionDatabaseEditWatcher
  extends AbstractNotionDatabase
  implements INotionDatabaseEditWatcher
{
  protected observers: IObserverHolder[] = [];
  protected watchInterval: ReturnType<typeof setInterval>;
  protected isIntervalActive: boolean = false;
  protected mostRecentDatabaseEditTime: string = '';

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
    const results = (await this.getDatabaseResults()) as DatabaseObjectResponse[];

    const lastEditedTimestamps = results.map((result) => {
      return new Date(result.last_edited_time);
    });

    const mostRecentEdit = new Date(
      Math.max.apply(
        null,
        lastEditedTimestamps.map((date) => {
          return date.getTime();
        })
      )
    ).toISOString();

    if (mostRecentEdit !== this.mostRecentDatabaseEditTime) {
      this.mostRecentDatabaseEditTime = mostRecentEdit;
      this.onRecentEdit();
    }
  }

  protected onRecentEdit(): void {
    this.notifyObservers();
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

  protected notifyObservers(): void {
    this.observers.forEach((observer) => {
      observer.cb.apply(observer.context);
    });
  }
}
