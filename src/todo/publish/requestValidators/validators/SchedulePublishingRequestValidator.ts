import { IRequestValidator } from '../types/interfaces';

export default class SchedulePublishingRequestValidator implements IRequestValidator {
  public validate(): boolean {
    return true;
  }
}
