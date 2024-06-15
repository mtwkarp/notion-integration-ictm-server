import { INotionDatabase } from '../../types/interfaces';
import { InstructorNotionPageId } from '../../../pages/types/types';
import { ListBlockChildrenResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { InstructorAvailableDatesCollection } from './types';
import { NotionUserId } from '../../../types/types';

export interface IInstructorsDatabase extends INotionDatabase {
  getInstructorPageBlocks(instructorPageId: InstructorNotionPageId): Promise<ListBlockChildrenResponse> | never;
  getInstructorAvailabilityDatabase(
    instructorPageId: InstructorNotionPageId
  ): Promise<IInstructorPersonalAvailabilityDatabase> | never;
  getInstructorPage(instructorPageId: InstructorNotionPageId): Promise<PageObjectResponse> | never;
  getInstructorAvailableDatesByUserId(userId: NotionUserId): Promise<InstructorAvailableDatesCollection> | never;
  getAllInstructorsAvailabilityDatabases(): Promise<IInstructorPersonalAvailabilityDatabase[]>;
  getInstructorAvailabilityDatabaseByUserId(userId: NotionUserId): Promise<IInstructorPersonalAvailabilityDatabase> | never;
  getInstructorNameByUserId(userId: NotionUserId): Promise<string>;
}

export interface IInstructorPersonalAvailabilityDatabase extends INotionDatabase {
  getInstructorAvailableDates(): Promise<InstructorAvailableDatesCollection>;
}

export interface IInstructorsAvailabilityDatabase extends INotionDatabase {
  fillInstructorAvailableDates(instructorId: string): Promise<void>;
}

export interface IInstructorsOccupationDatabase extends INotionDatabase {
  fillInstructorsOccupationDates(instructorId: string): Promise<void>;
}
