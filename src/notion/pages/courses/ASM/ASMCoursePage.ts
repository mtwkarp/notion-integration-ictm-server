import AbstractNotionPage from '../../AbstractNotionPage';
import { InstructorNotionPageId } from '../../types/types';
import { INotionCoursePage } from '../../types/interfaces';

export default class ASMCoursePage extends AbstractNotionPage implements INotionCoursePage {
  public async fillAvailableInstructorsProperty(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
