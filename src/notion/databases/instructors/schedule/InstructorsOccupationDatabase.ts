import AbstractNotionDatabase from '../../AbstractNotionDatabase';
import { IInstructorsOccupationDatabase } from '../types/interfaces';

export default class InstructorsOccupationDatabase extends AbstractNotionDatabase implements IInstructorsOccupationDatabase {
  constructor() {
    super(process.env.NOTION_OCCUPIED_INSTRUCTORS_DATES_DATABASE_ID);
  }

  fillInstructorsOccupationDates(instructorId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
