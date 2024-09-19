export interface IUsersScheduleCollection {
  setUserSchedule(userId: string, schedule: string[]): Promise<void>;
  getUsersSchedule(): Promise<Record<string, string[]>>;
}
