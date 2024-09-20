import { InstructorNotionPageId } from './types';

export interface INotionPage {
  id: InstructorNotionPageId;
}

export interface INotionInstructorPage extends INotionPage {}

export interface INotionCoursePage extends INotionPage {
  getCourseDate(): Promise<string | undefined>;
  fillAvailableInstructorsProperty(instructorNames: string[]): Promise<void>;
}
