export interface INotionDatabaseEditWatcher {
  runWatchInterval(): void;
  stopWatchInterval(): void;
  subscribeObserver(cb: Function, context: object): void;
  unsubscribeObserver(cb: Function, context: object): void;
  getLastEditedPageId(): string;
}
