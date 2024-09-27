import { ListBlockChildrenResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { INotionDatabase } from '../../types/interfaces';
import { InstructorNotionPageId } from '../../../pages/types/types';
import { InstructorAvailableDatesCollection } from './types';
import { NotionUserId } from '../../../types/types';

export interface IInstructorsNDB extends INotionDatabase {
  getInstructorPageBlocks(instructorPageId: InstructorNotionPageId): Promise<ListBlockChildrenResponse> | never;
  getInstructorAvailabilityDatabase(
    instructorPageId: InstructorNotionPageId
  ): Promise<IInstructorPersonalAvailabilityNDB> | never;
  getInstructorPage(instructorPageId: InstructorNotionPageId): Promise<PageObjectResponse> | never;
  getInstructorAvailableDatesByUserId(userId: NotionUserId): Promise<InstructorAvailableDatesCollection> | never;
  getAllInstructorsAvailabilityDatabases(): Promise<IInstructorPersonalAvailabilityNDB[]>;
  getInstructorAvailabilityDatabaseByUserId(userId: NotionUserId): Promise<IInstructorPersonalAvailabilityNDB> | never;
  getInstructorNameByUserId(userId: NotionUserId): Promise<string>;
}

export interface IInstructorPersonalAvailabilityNDB extends INotionDatabase {
  getInstructorAvailableDates(): Promise<InstructorAvailableDatesCollection>;
}

export interface IInstructorsAvailabilityNDB extends INotionDatabase {
  fillInstructorAvailableDates(instructorId: string): Promise<void>;
  getAvailableInstructorNamesByDate(date: string): Promise<string>;
}

export interface IInstructorsOccupationNDB extends INotionDatabase {
  fillInstructorsOccupationDates(instructorId: string): Promise<void>;
}
