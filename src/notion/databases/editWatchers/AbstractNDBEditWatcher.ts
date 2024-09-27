import { injectable } from 'inversify';
import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { INDBEditWatcher } from './types/interfaces';
import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { IObserverHolder } from './types/types';

@injectable()
export default abstract class AbstractNDBEditWatcher extends AbstractNotionDatabase implements INDBEditWatcher {
  protected observers: IObserverHolder[] = [];

  protected watchInterval: ReturnType<typeof setInterval>;

  protected isIntervalActive: boolean = false;

  protected mostRecentDatabaseEditTime: string = '';

  protected lastEditedPageId: string = '';

  public runWatchInterval(): void {
    if (this.isIntervalActive) {
      console.warn('The interval already active');
      return;
    }

    this.watchInterval = setInterval(this.checkForEdits.bind(this), 1000);
    this.isIntervalActive = true;
  }

  public getLastEditedPageId(): string {
    return this.lastEditedPageId;
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
    const mostRecentEdit = this.mostRecentDatabaseEditTime;

    await this.setLastEditedPageIdAndTimestamp();

    if (mostRecentEdit !== this.mostRecentDatabaseEditTime) {
      this.onRecentEdit();
    }
  }

  protected async setLastEditedPageIdAndTimestamp(): Promise<void> {
    const results = (await this.getDatabaseResults()) as DatabaseObjectResponse[];

    const lastEditedTimestamps = results.map((result) => new Date(result.last_edited_time));

    if (!lastEditedTimestamps.length) {
      return;
    }

    const mostRecentEdit = new Date(
      Math.max.apply(
        null,
        lastEditedTimestamps.map((date) => date.getTime()),
      ),
    ).toISOString();

    if (mostRecentEdit !== this.mostRecentDatabaseEditTime) {
      this.mostRecentDatabaseEditTime = mostRecentEdit;
      this.lastEditedPageId = results.find((result) => result.last_edited_time === mostRecentEdit)?.id || '';
    }
  }

  protected onRecentEdit(): void {
    this.notifyObservers();
  }

  public subscribeObserver(cb: Function, context: object): void {
    this.observers.push({ cb, context });
  }

  public unsubscribeObserver(cb: Function, context: object): void {
    const targetObservers = this.observers.filter((observer) => observer.cb === cb && observer.context === context);

    targetObservers.forEach((observer) => {
      this.observers.splice(this.observers.indexOf(observer), 1);
    });
  }

  protected notifyObservers(): void {
    this.observers.forEach((observer) => {
      observer.cb.apply(observer.context, [this.lastEditedPageId]);
    });
  }
}
