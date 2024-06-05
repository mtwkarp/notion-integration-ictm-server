import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { NotionDatabaseId } from '../types/types';
import { InstructorAvailableDatesCollection } from './types/types';
import { getKyivDate } from '../../../utils/dateHelpers';

export default class InstructorAvailabilityDatabase extends AbstractNotionDatabase {
  constructor(databaseId: NotionDatabaseId) {
    super(databaseId);
  }
  //get instructor available dates from today
  public async getInstructorAvailableDates(): Promise<InstructorAvailableDatesCollection> {
    const res = await this.queryDatabase();
    const dates: InstructorAvailableDatesCollection = [];

    res.results.forEach((r) => {
      // @ts-ignore
      dates.push(r.properties['Дата'].date.start);
    });

    return dates;
  }
}
