import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { injectable } from 'inversify';
import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { InstructorAvailableDatesCollection } from './types/types';
import { filterDatesBeforeTargetDate, getFormatedKyivDate } from '../../../utils/dateHelpers';
import { IInstructorPersonalAvailabilityNDB } from './types/interfaces';

@injectable()
export default class InstructorPersonalAvailabilityNDB
  extends AbstractNotionDatabase
  implements IInstructorPersonalAvailabilityNDB {
  // get instructor available dates from today
  public async getInstructorAvailableDates(): Promise<InstructorAvailableDatesCollection> {
    const databaseResponse = await this.queryDatabase();
    const results = databaseResponse.results as PageObjectResponse[];
    const dates: InstructorAvailableDatesCollection = [];

    for (let i = 0; i < results.length; i++) {
      const page = results[i];

      if (!this.checkIfPageDatePagePropertyIsCorrect(page)) {
        continue;
      }

      // @ts-ignore
      dates.push(page.properties['Дата'].date.start);
    }

    const filteredDateFromToday: string[] = filterDatesBeforeTargetDate(dates, getFormatedKyivDate());
    // remove duplicated dates
    return Array.from(new Set(filteredDateFromToday));
  }

  private checkIfPageDatePagePropertyIsCorrect(page: PageObjectResponse): boolean {
    if (page.properties['Дата'] === undefined) {
      console.error(`No property with name Дата was found in database with id - ${this.databaseId}. Page url - ${page.url}`);

      return false;
    }

    // @ts-ignore
    if (!page.properties['Дата'].date) {
      console.error(`No date object was found in database with id - ${this.databaseId}. Page url - ${page.url}`);
      return false;
    }

    // @ts-ignore
    if (page.properties['Дата'].date.start === null) {
      console.error(`No start date was found in database with id - ${this.databaseId}. Page url - ${page.url}`);
      return false;
    }

    return true;
  }
}
