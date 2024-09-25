import AbstractNotionPage from '../AbstractNotionPage';
import { INotionCoursePage } from '../types/interfaces';
import { DatePropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export default class CoursePage extends AbstractNotionPage implements INotionCoursePage {
  public async fillAvailableInstructorsProperty(availableInstructorNames: string[]): Promise<void> {
    try {
      await this.notionClient.pages.update({
        page_id: this.pageId,
        properties: {
          ['Доступні інструктори']: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: this.formatInstructorNamesPropertyValue(availableInstructorNames)
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

  private formatInstructorNamesPropertyValue(availableInstructorNames: string[]) {
    let propertyValue: string = '';

    if (availableInstructorNames.length) {
      propertyValue = availableInstructorNames.join('');
    } else {
      propertyValue = this.noInstructorsMessage;
    }

    return propertyValue;
  }

  private get noInstructorsMessage(): string {
    return 'Немає доступних інструкторів 😭';
  }

  public async getCourseDate(): Promise<string | undefined> {
    const pageResponse = await this.retrievePage();
    const dateProperty = pageResponse.properties['Дата'] as DatePropertyItemObjectResponse;

    return dateProperty.date?.start;
  }
}
