import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface ICoursesScheduleNDBModifier {
  updateAvailableUsersOnCoursePages(): Promise<void>;
}

export interface ICoursesScheduleNDBDataGetter {
  getAvailableUsersByDates(): Promise<Record<string, string[]>>;
  getCurrentCourses(): Promise<PageObjectResponse[]>;
  getOccupiedInstructorDates(): Promise<Record<string, string[]>>;
}