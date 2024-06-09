import AbstractNotionDatabaseEditWatcher from '../AbstractNotionDatabaseEditWatcher';
import { injectable } from 'inversify';

@injectable()
export default class CoursesScheduleDatabaseEditWatcher extends AbstractNotionDatabaseEditWatcher {
  constructor() {
    super(process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID);
  }
}
