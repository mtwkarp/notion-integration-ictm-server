import { INotionDatabase } from '../../types/interfaces';
import { InstructorNotionPageId } from '../../../pages/types/types';
import { ListBlockChildrenResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import InstructorPersonalAvailabilityDatabase from '../InstructorPersonalAvailabilityDatabase';
import { InstructorAvailableDatesCollection } from './types';

export interface IInstructorsDatabase extends INotionDatabase {
  getInstructorPageBlocks(instructorPageId: InstructorNotionPageId): Promise<ListBlockChildrenResponse> | never;
  getInstructorAvailabilityDatabase(
    instructorPageId: InstructorNotionPageId
  ): Promise<InstructorPersonalAvailabilityDatabase> | never;
  getInstructorPage(instructorPageId: InstructorNotionPageId): Promise<PageObjectResponse> | never;
  getInstructorAvailableDates(): Promise<InstructorAvailableDatesCollection>;
  getAllInstructorsAvailabilityDatabases(): Promise<IInstructorPersonalAvailabilityDatabase[]>;
}

export interface IInstructorPersonalAvailabilityDatabase extends INotionDatabase {
  getInstructorAvailableDates(): Promise<InstructorAvailableDatesCollection>;
}
