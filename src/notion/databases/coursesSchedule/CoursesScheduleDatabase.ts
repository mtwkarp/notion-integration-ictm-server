import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { INotionDatabaseEditWatcher } from '../editWatchers/types/interfaces';
import CoursesScheduleDatabaseEditWatcher from '../editWatchers/implementations/CoursesScheduleDatabaseEditWatcher';
import ASMCoursePage from '../../pages/courses/ASM/ASMCoursePage';
import { IInstructorsAvailabilityDatabase } from '../instructors/types/interfaces';
import InstructorsAvailabilityDatabase from '../instructors/schedule/InstructorsAvailabilityDatabase';

export default class CoursesScheduleDatabase extends AbstractNotionDatabase {
  private editsWatcher: INotionDatabaseEditWatcher;
  private instructorsAvailabilityDatabase: IInstructorsAvailabilityDatabase;

  constructor() {
    super(process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID);

    this.editsWatcher = new CoursesScheduleDatabaseEditWatcher();
    this.instructorsAvailabilityDatabase = new InstructorsAvailabilityDatabase();

    this.initialize();
  }

  private initialize(): void {
    this.subscribe();
    this.editsWatcher.runWatchInterval();
  }

  private subscribe(): void {
    this.editsWatcher.subscribeObserver(this.onDatabaseEdit, this);
  }

  private async onDatabaseEdit(coursePageId: string): Promise<void> {
    await this.updateAvailableInstructorsAtCourseDayPage(coursePageId);
  }

  private async updateAvailableInstructorsAtCourseDayPage(coursePageId: string): Promise<void> {
    const coursePage = new ASMCoursePage(coursePageId);
    const courseDate = await coursePage.getCourseData();

    if (!courseDate) {
      console.warn(`No course date found, course page id - ${coursePageId}`);
      return;
    }

    const instructorNames = await this.instructorsAvailabilityDatabase.getAvailableInstructorNamesByDate(courseDate);

    await coursePage.fillAvailableInstructorsProperty(instructorNames);
  }
}
