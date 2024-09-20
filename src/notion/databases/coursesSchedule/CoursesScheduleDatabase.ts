import AbstractNotionDatabase from '../AbstractNotionDatabase';
import CoursePage from '../../pages/courses/CoursePage';
import { IInstructorsAvailabilityDatabase } from '../instructors/types/interfaces';
import InstructorsAvailabilityDatabase from '../instructors/schedule/InstructorsAvailabilityDatabase';
import { IUsersScheduleCollection } from '../../../db/collections/implementations/types/interfaces';
import UsersScheduleCollection from '../../../db/collections/implementations/UsersScheduleCollection';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getFormatedKyivDate } from '../../../utils/dateHelpers';

export default class CoursesScheduleDatabase extends AbstractNotionDatabase {
  private readonly userScheduleCollection: IUsersScheduleCollection = new UsersScheduleCollection();

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

  public async updateAvailableUsersOnCoursePages(): Promise<void> {
    const currentCourses = await this.getCurrentCourses();
    const usersFormattedSchedule = await this.userScheduleCollection.getRawUsersSchedule();

    console.log(usersFormattedSchedule);

    for (let i = 0; i < currentCourses.length; i++) {
      const coursePageId = currentCourses[i].id;
      const coursePage = new CoursePage(coursePageId);
      const courseDate = await coursePage.getCourseDate();

      if (!courseDate) {
        console.warn(`No course date found, course page id - ${coursePageId}`);
        return;
      }
    }

    // await coursePage.fillAvailableInstructorsProperty(instructorNames);
  }
}
