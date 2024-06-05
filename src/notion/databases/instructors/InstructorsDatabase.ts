import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { injectable } from 'inversify';
import { InstructorNotionPageId } from '../../pages/types/types';
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import { NotionDatabaseTitles } from '../types/enums';
import InstructorAvailabilityDatabase from './InstructorAvailabilityDatabase';
import { IInstructorAvailabilityDatabase } from './types/interfaces';

@injectable()
export default class InstructorsDatabase extends AbstractNotionDatabase {
  constructor() {
    super(process.env.NOTION_INSTRUCTORS_DATABASE_ID);
  }

  public async getInstructorPage(instructorPageId: InstructorNotionPageId): Promise<PageObjectResponse> | never {
    try {
      return (await this.notionClient.pages.retrieve({
        page_id: instructorPageId
      })) as PageObjectResponse;
    } catch (error) {
      throw new Error(
        `Something went wrong during retrieving instructor page: ${error}. Instructor page id - ${instructorPageId}`
      );
    }
  }

  public async getInstructorPageBlocks(
    instructorPageId: InstructorNotionPageId
  ): Promise<ListBlockChildrenResponse> | never {
    try {
      return await this.notionClient.blocks.children.list({ block_id: instructorPageId });
    } catch (error) {
      throw new Error(
        `Something went wrong during retrieving instructor page blocks: ${error}. Instructor page id - ${instructorPageId}`
      );
    }
  }

  public async getInstructorAvailabilityDatabase(
    instructorPageId: InstructorNotionPageId
  ): Promise<IInstructorAvailabilityDatabase> | never {
    const instructorPageChildren = await this.getInstructorPageBlocks(instructorPageId);
    const blocks = instructorPageChildren.results as BlockObjectResponse[];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      if (block.type === 'child_database' && block.child_database.title === NotionDatabaseTitles.INSTRUCTOR_AVAILABILITY) {
        return new InstructorAvailabilityDatabase(block.id);
      }
    }

    throw new Error(`No availability database found at this instructor page id - ${instructorPageId}.`);
  }

  public async getAllInstructorsAvailabilityDatabases(): Promise<IInstructorAvailabilityDatabase[]> {
    const databaseQuery = await this.queryDatabase();
    const result: IInstructorAvailabilityDatabase[] = [];

    for (let i = 0; i < databaseQuery.results.length; i++) {
      const databaseId = databaseQuery.results[i].id;
      const availabilityDatabase = await this.getInstructorAvailabilityDatabase(databaseId);
      result.push(availabilityDatabase);
    }

    return result;
  }
}
