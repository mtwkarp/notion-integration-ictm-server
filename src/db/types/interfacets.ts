export interface IDatabase {
  init(): void;
  getDatabase(): any | never;
}
