import { INotionDatabase } from '../../types/interfaces';
import { InstructorNotionPageId } from '../../../pages/types/types';
import { ListBlockChildrenResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import InstructorAvailabilityDatabase from '../InstructorAvailabilityDatabase';
import { InstructorAvailableDatesCollection } from './types';

export interface IInstructorsDatabase extends INotionDatabase {
  getInstructorPageBlocks(instructorPageId: InstructorNotionPageId): Promise<ListBlockChildrenResponse> | never;
  getInstructorAvailabilityDatabase(
    instructorPageId: InstructorNotionPageId
  ): Promise<InstructorAvailabilityDatabase> | never;
  getInstructorPage(instructorPageId: InstructorNotionPageId): Promise<PageObjectResponse> | never;
}

export interface IInstructorAvailabilityDatabase extends INotionDatabase {
  getInstructorAvailableDates(): Promise<InstructorAvailableDatesCollection>;
}
