import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { injectable } from 'inversify';
import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { getFormatedKyivDate } from '../../../utils/dateHelpers';
import { IScheduleNDB } from './types/interfaces';

@injectable()
export default class ScheduleNDB extends AbstractNotionDatabase implements IScheduleNDB {
  constructor(databaseId?: string) {
    super(databaseId || process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID);
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
}
