import AbstractNotionPage from '../AbstractNotionPage';
import { INotionCoursePage } from '../types/interfaces';
import { DatePropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export default class CoursePage extends AbstractNotionPage implements INotionCoursePage {
  public async fillAvailableInstructorsProperty(availableInstructorNames: string): Promise<void> {
    try {
      await this.notionClient.pages.update({
        page_id: this.pageId,
        properties: {
          ['Доступні інструктори']: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: availableInstructorNames
                }
              }
            ]
          }
        }
      });

      console.log('Course page updated successfully');
    } catch (error) {
      throw new Error(`Error updating page: ${error}`);
    }
  }

  public async getCourseDate(): Promise<string | undefined> {
    const pageResponse = await this.retrievePage();
    const dateProperty = pageResponse.properties['Дата'] as DatePropertyItemObjectResponse;

    return dateProperty.date?.start;
  }
}
