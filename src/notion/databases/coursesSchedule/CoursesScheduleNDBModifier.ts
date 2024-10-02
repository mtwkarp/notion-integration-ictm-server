import {
  DatePropertyItemObjectResponse,
  PageObjectResponse,
  UserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { inject, injectable } from 'inversify';
import AbstractNotionDatabase from '../AbstractNotionDatabase';
import NotionCoursePage from '../../pages/courses/NotionCoursePage';
import {
  IUsersOccupationCollection,
  IUsersScheduleCollection
} from '../../../db/collections/implementations/types/interfaces';
import { getFormatedKyivDate } from '../../../utils/dateHelpers';
import { ICoursesScheduleNDBDataGetter, ICoursesScheduleNDBModifier } from './types/interfaces';
import { INotionUsersData } from '../../users/types/interfaces';
import { Types } from '../../../IoC/Types';
import UsersOccupationCollection from '../../../db/collections/implementations/UsersOccupationCollection';
import { DateRecord } from './types/types';

@injectable()
export default class CoursesScheduleNDBModifier extends AbstractNotionDatabase implements ICoursesScheduleNDBModifier {
  private readonly coursesScheduleNDBDataGetter: ICoursesScheduleNDBDataGetter
  private readonly usersOccupationCollection: IUsersOccupationCollection

  constructor(
@inject(Types.CoursesScheduleNDBDataGetter) coursesScheduleNDBDataGetter: ICoursesScheduleNDBDataGetter,
@inject(Types.UsersOccupationCollection) usersOccupationCollection: IUsersOccupationCollection
  ) {
    super(process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID);
      this.coursesScheduleNDBDataGetter = coursesScheduleNDBDataGetter;
      this.usersOccupationCollection = usersOccupationCollection;

  }

  public async getNotOccupiedInstructorsByDates(): Promise<DateRecord> {
    const datesProvidedByUsers = await this.coursesScheduleNDBDataGetter.getAvailableUsersByDates();
    const usersOccupiedDates = await this.usersOccupationCollection.getUsersOccupiedDates()
    const result = { ...datesProvidedByUsers };

      for (const key in usersOccupiedDates) {
        if (result[key]) {
          result[key] = result[key].filter(date => !usersOccupiedDates[key].includes(date));

          if (result[key].length === 0) {
            delete result[key];
          }
        }
      }

    return result
  }

  public async updateAvailableUsersOnCoursePages(): Promise<void> {
    const currentCourses = await this.coursesScheduleNDBDataGetter.getCurrentCourses();
    const availableUsersByDates = await this.getNotOccupiedInstructorsByDates()

    for (let i = 0; i < currentCourses.length; i++) {
      const coursePageId = currentCourses[i].id;
      const coursePage = new NotionCoursePage(coursePageId);
      // eslint-disable-next-line no-await-in-loop
      const courseDate = await coursePage.getCourseDate();

      if (!courseDate) {
        console.warn(`No course date found, course page id - ${coursePageId}`);
        continue;
      }

      const availableUsers = availableUsersByDates[courseDate] || [];

      // eslint-disable-next-line no-await-in-loop
      await coursePage.fillAvailableInstructorsProperty(availableUsers);
    }
  }


}
