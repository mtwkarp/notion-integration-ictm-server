import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface ICoursesScheduleNDB {
  updateAvailableUsersOnCoursePages(): Promise<void>;
  getAvailableUsersByDates(): Promise<Record<string, string[]>>;
  getCurrentCourses(): Promise<PageObjectResponse[]>;
  getOccupiedInstructorDates(): Promise<Record<string, string[]>>;
}
