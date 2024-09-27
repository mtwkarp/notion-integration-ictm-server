export interface INDBEditWatcher {
  runWatchInterval(): void;
  stopWatchInterval(): void;
  subscribeObserver(cb: Function, context: object): void;
  unsubscribeObserver(cb: Function, context: object): void;
  getLastEditedPageId(): string;
}
