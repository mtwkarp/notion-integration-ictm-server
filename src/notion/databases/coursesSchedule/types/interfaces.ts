export interface ICoursesScheduleDB {
  updateAvailableUsersOnCoursePages(): Promise<void>;
  getAvailableUsersByDates(): Promise<Record<string, string[]>>;
}
