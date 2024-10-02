import AbstractNotionDatabase from '../AbstractNotionDatabase';
import {
  DatePropertyItemObjectResponse,
  PageObjectResponse,
  UserObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import { getFormatedKyivDate } from '../../../utils/dateHelpers';
import { ICoursesScheduleNDBDataGetter } from './types/interfaces';
import { IUsersScheduleCollection } from '../../../db/collections/implementations/types/interfaces';
import { INotionUsersData } from '../../users/types/interfaces';
import { inject, injectable } from 'inversify';
import { Types } from '../../../IoC/Types';
import { DateRecord } from './types/types';

@injectable()
export default class CoursesScheduleNDBDataGetter extends AbstractNotionDatabase implements ICoursesScheduleNDBDataGetter{

  private readonly userScheduleCollection: IUsersScheduleCollection;

  private readonly notionUsersInfo: INotionUsersData;

  constructor(
    @inject(Types.UsersScheduleCollection) usersScheduleCollection: IUsersScheduleCollection,
    @inject(Types.NotionUsersData) notionUsersData: INotionUsersData,
  ) {
    super(process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID);
    this.userScheduleCollection = usersScheduleCollection;
    this.notionUsersInfo = notionUsersData;
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

  public async getAvailableUsersByDates(): Promise<DateRecord> {
    const usersRawSchedule = await this.userScheduleCollection.getRawUsersSchedule();
    const usersNamesById = await this.notionUsersInfo.getAllUsersWithPersonTypeNamesById();
    const availableUsersByDate: Record<string, string[]> = {};

    // eslint-disable-next-line no-restricted-syntax
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

        if (!occupiedInstructorIds[dateProperty.date.start]) {
          occupiedInstructorIds[dateProperty.date.start] = [];
        }

        occupiedInstructorIds[dateProperty.date.start].push(person.name as string);
      }
    }

    console.log(occupiedInstructorIds)

    return occupiedInstructorIds;
  }
}