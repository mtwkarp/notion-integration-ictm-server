import { DatePropertyItemObjectResponse, UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { injectable } from 'inversify';
import { IOccupiedUsersNGetter } from './types/interfaces';
import ScheduleNDB from './ScheduleNDB';

@injectable()
export default class ScheduleOccupiedUsersNGetter extends ScheduleNDB implements IOccupiedUsersNGetter {

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
