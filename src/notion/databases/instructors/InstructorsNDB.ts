import { injectable } from 'inversify';
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { InstructorNotionPageId } from '../../pages/types/types';
import { NotionDatabaseTitles } from '../types/enums';
import InstructorPersonalAvailabilityNDB from './InstructorPersonalAvailabilityNDB';
import { IInstructorPersonalAvailabilityNDB, IInstructorsNDB } from './types/interfaces';
import { InstructorAvailableDatesCollection } from './types/types';
import { NotionPersonType, NotionTextType, NotionUserId } from '../../types/types';
import NotionUserObject from '../objects/person/NotionUserObject';

@injectable()
export default class InstructorsNDB extends AbstractNotionDatabase implements IInstructorsNDB {
  constructor() {
    super(process.env.NOTION_INSTRUCTORS_DATABASE_ID);
  }

  public async getInstructorPage(instructorPageId: InstructorNotionPageId): Promise<PageObjectResponse> | never {
    try {
      return (await this.notionClient.pages.retrieve({
        page_id: instructorPageId,
      })) as PageObjectResponse;
    } catch (error) {
      throw new Error(
        `Something went wrong during retrieving instructor page: ${error}. Instructor page id - ${instructorPageId}`,
      );
    }
  }

  public async getInstructorPageBlocks(
    instructorPageId: InstructorNotionPageId,
  ): Promise<ListBlockChildrenResponse> | never {
    try {
      return await this.notionClient.blocks.children.list({ block_id: instructorPageId });
    } catch (error) {
      throw new Error(
        `Something went wrong during retrieving instructor page blocks: ${error}. Instructor page id - ${instructorPageId}`,
      );
    }
  }

  public async getInstructorAvailabilityDatabase(
    instructorPageId: InstructorNotionPageId,
  ): Promise<IInstructorPersonalAvailabilityNDB> | never {
    const instructorPageChildren = await this.getInstructorPageBlocks(instructorPageId);
    const blocks = instructorPageChildren.results as BlockObjectResponse[];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      if (block.type === 'child_database' && block.child_database.title === NotionDatabaseTitles.INSTRUCTOR_AVAILABILITY) {
        return new InstructorPersonalAvailabilityNDB(block.id);
      }
    }

    throw new Error(`No availability database found at this instructor page id - ${instructorPageId}.`);
  }

  public async getAllInstructorsAvailabilityDatabases(): Promise<IInstructorPersonalAvailabilityNDB[]> {
    const databaseQuery = await this.queryDatabase();
    const result: IInstructorPersonalAvailabilityNDB[] = [];

    for (let i = 0; i < databaseQuery.results.length; i++) {
      const databaseId = databaseQuery.results[i].id;
      // eslint-disable-next-line no-await-in-loop
      const availabilityDatabase = await this.getInstructorAvailabilityDatabase(databaseId);
      result.push(availabilityDatabase);
    }

    return result;
  }

  public async getInstructorAvailableDatesByUserId(
    userId: NotionUserId,
  ): Promise<InstructorAvailableDatesCollection> | never {
    const instructorAvailabilityDatabase = await this.getInstructorAvailabilityDatabaseByUserId(userId);

    return instructorAvailabilityDatabase.getInstructorAvailableDates();
  }

  public async getInstructorAvailabilityDatabaseByUserId(
    userId: NotionUserId,
  ): Promise<IInstructorPersonalAvailabilityNDB> | never {
    const { id } = await this.getInstructorPageByUserId(userId);

    return this.getInstructorAvailabilityDatabase(id);
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
    const nameProperty: NotionTextType = instructorPage.properties['Прізвище та Імʼя'] as NotionTextType;

    if (!nameProperty) {
      throw new Error(`No instructor name property specified, user id - ${userId}`);
    }

    const richText = nameProperty.rich_text[0] as TextRichTextItemResponse;

    return richText.text.content;
  }
}
