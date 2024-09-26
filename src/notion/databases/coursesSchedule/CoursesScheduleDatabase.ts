import AbstractNotionDatabase from '../AbstractNotionDatabase';
import CoursePage from '../../pages/courses/CoursePage';
import { IUsersCollection, IUsersScheduleCollection } from '../../../db/collections/implementations/types/interfaces';
import UsersScheduleCollection from '../../../db/collections/implementations/UsersScheduleCollection';
import {
  DatePropertyItemObjectResponse,
  PageObjectResponse,
  UserObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import { getFormatedKyivDate } from '../../../utils/dateHelpers';
import { ICoursesScheduleDB } from './types/interfaces';
import { INotionUsersInfo } from '../../users/types/interfaces';
import NotionUsersInfo from '../../users/NotionUsersInfo';

export default class CoursesScheduleDatabase extends AbstractNotionDatabase implements ICoursesScheduleDB {
  private readonly userScheduleCollection: IUsersScheduleCollection = new UsersScheduleCollection();
  private readonly notionUsersInfo: INotionUsersInfo = new NotionUsersInfo();

  constructor() {
    super(process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID);
  }

  public async getCurrentCourses(): Promise<PageObjectResponse[]> {
    const res = (await this.getDatabaseResults()) as PageObjectResponse[];
    const todayDate = new Date(getFormatedKyivDate());

    return res.filter((page) => {
      const dateProperty = page.properties['Дата'];
      // @ts-ignore
      if (!dateProperty || !dateProperty.date || !dateProperty.date.start) {
        return false;
      }

      // @ts-ignore
      return new Date(dateProperty.date.start) >= todayDate;
    });
  }

  public async getAvailableUsersByDates(): Promise<Record<string, string[]>> {
    const usersRawSchedule = await this.userScheduleCollection.getRawUsersSchedule();
    const usersNamesById = await this.notionUsersInfo.getAllUsersWithPersonTypeNamesById();
    const availableUsersByDate: Record<string, string[]> = {};

    for (const userId in usersRawSchedule) {
      const dates = usersRawSchedule[userId];

      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const userName = usersNamesById[userId];

        if (!userName) {
          continue;
        }

        if (availableUsersByDate[date]) {
          availableUsersByDate[date].push(userName);
        } else {
          availableUsersByDate[date] = [userName];
        }
      }
    }

    return availableUsersByDate;
  }

  public async updateAvailableUsersOnCoursePages(): Promise<void> {
    const currentCourses = await this.getCurrentCourses();
    const availableUsersByDates = await this.getAvailableUsersByDates();

    for (let i = 0; i < currentCourses.length; i++) {
      const coursePageId = currentCourses[i].id;
      const coursePage = new CoursePage(coursePageId);
      const courseDate = await coursePage.getCourseDate();

      if (!courseDate) {
        console.warn(`No course date found, course page id - ${coursePageId}`);
        continue;
      }

      const availableUsers = availableUsersByDates[courseDate] || [];

      await coursePage.fillAvailableInstructorsProperty(availableUsers);
    }
  }

  public async getOccupiedInstructorDates(): Promise<Record<string, string[]>> {
    const currentCourses = await this.getCurrentCourses();
    const occupiedInstructorIds: Record<string, string[]> = {};

    for (let i = 0; i < currentCourses.length; i++) {
      const coursePage = currentCourses[i];
      const dateProperty = coursePage.properties['Дата'] as DatePropertyItemObjectResponse;
      // @ts-ignore
      const personProperty = coursePage.properties['Інструктори'].people as UserObjectResponse[];
      // @ts-ignore
      if (!dateProperty || !dateProperty.date || !dateProperty.date.start) {
        continue;
      }

      for (let j = 0; j < personProperty.length; j++) {
        const person = personProperty[j];

        if (!occupiedInstructorIds[person.id]) {
          occupiedInstructorIds[person.id] = [];
        }

        occupiedInstructorIds[person.id].push(dateProperty.date.start);
      }
    }

    return occupiedInstructorIds;
  }
}
