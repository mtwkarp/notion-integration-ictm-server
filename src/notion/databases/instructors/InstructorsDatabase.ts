import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { injectable } from 'inversify';
import { InstructorNotionPageId } from '../../pages/types/types';
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  PersonUserObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import { NotionDatabaseTitles } from '../types/enums';
import InstructorPersonalAvailabilityDatabase from './InstructorPersonalAvailabilityDatabase';
import { IInstructorPersonalAvailabilityDatabase, IInstructorsDatabase } from './types/interfaces';
import { InstructorAvailableDatesCollection } from './types/types';
import { NotionPersonType, NotionUserId } from '../../types/types';
import NotionUserObject from '../objects/person/NotionUserObject';

@injectable()
export default class InstructorsDatabase extends AbstractNotionDatabase implements IInstructorsDatabase {
  constructor() {
    super(process.env.NOTION_INSTRUCTORS_DATABASE_ID);

    this.getInstructorNameByUserId('c7d2902a-3218-4d89-8ef5-801100358602');
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
  ): Promise<IInstructorPersonalAvailabilityDatabase> | never {
    const instructorPageChildren = await this.getInstructorPageBlocks(instructorPageId);
    const blocks = instructorPageChildren.results as BlockObjectResponse[];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      if (block.type === 'child_database' && block.child_database.title === NotionDatabaseTitles.INSTRUCTOR_AVAILABILITY) {
        return new InstructorPersonalAvailabilityDatabase(block.id);
      }
    }

    throw new Error(`No availability database found at this instructor page id - ${instructorPageId}.`);
  }

  public async getAllInstructorsAvailabilityDatabases(): Promise<IInstructorPersonalAvailabilityDatabase[]> {
    const databaseQuery = await this.queryDatabase();
    const result: IInstructorPersonalAvailabilityDatabase[] = [];

    for (let i = 0; i < databaseQuery.results.length; i++) {
      const databaseId = databaseQuery.results[i].id;
      const availabilityDatabase = await this.getInstructorAvailabilityDatabase(databaseId);
      result.push(availabilityDatabase);
    }

    return result;
  }

  public async getInstructorAvailabilityDatesByUserId(
    userId: NotionUserId
  ): Promise<InstructorAvailableDatesCollection> | never {
    const instructorAvailabilityDatabase = await this.getInstructorAvailabilityDatabaseByUserId(userId);

    return await instructorAvailabilityDatabase.getInstructorAvailableDates();
  }

  public async getInstructorAvailabilityDatabaseByUserId(
    userId: NotionUserId
  ): Promise<IInstructorPersonalAvailabilityDatabase> | never {
    const { id } = await this.getInstructorPageByUserId(userId);

    return await this.getInstructorAvailabilityDatabase(id);
  }

  public async getInstructorPageByUserId(userId: NotionUserId): Promise<PageObjectResponse> | never {
    const databaseResponse = await this.getDatabaseResults();

    for (let i = 0; i < databaseResponse.length; i++) {
      const { properties } = databaseResponse[i] as PageObjectResponse;

      if (properties && properties.Person) {
        const person = properties.Person as NotionPersonType;

        if (person.people.length) {
          const id = new NotionUserObject(person.people[0]).getUserId();

          if (userId === id) {
            return databaseResponse[i] as PageObjectResponse;
          }
        }
      }
    }

    throw new Error(`No such instructor page id - ${userId}`);
  }

  public async getInstructorNameByUserId(userId: NotionUserId): Promise<string> {
    const instructorPage = await this.getInstructorPageByUserId(userId);

    console.log(instructorPage);
    return '';
  }
}
