export interface IUsersScheduleCollection {
  setUserSchedule(userId: string, schedule: string[]): Promise<void>;
  getRawUsersSchedule(): Promise<Record<string, string[]>>;
}

export interface IUsersOccupationCollection {
  getUsersOccupiedDates(): Promise<Record<string, string[]>>;
  startWatchForScheduleDatabasesUpdate(): void;
}

export interface IUsersCollection {
  getUsersNamesById(): Promise<Record<string, string>>;
  setUsersNamesById(): Promise<void>;
}
