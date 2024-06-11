import AbstractNotionDatabase from '../../AbstractNotionDatabase';
import { IInstructorsAvailabilityDatabase, IInstructorsDatabase } from '../types/interfaces';
import InstructorsDatabase from '../InstructorsDatabase';
import { NotionUserId } from '../../../types/types';

export default class InstructorsAvailabilityDatabase
  extends AbstractNotionDatabase
  implements IInstructorsAvailabilityDatabase
{
  protected instructorsDatabase: IInstructorsDatabase;

  constructor() {
    super(process.env.NOTION_AVAILABLE_INSTRUCTORS_DATES_DATABASE_ID);

    this.instructorsDatabase = new InstructorsDatabase();
  }

  public async fillInstructorAvailabilityDates(instructorId: NotionUserId): Promise<void> {
    // const instructorAvailableDates =
    return Promise.resolve(undefined);
  }

  protected async clearInstructorAvailableDates(instructorId: NotionUserId): Promise<void> {
    const databaseResults = await this.getDatabaseResults();
  }
}
