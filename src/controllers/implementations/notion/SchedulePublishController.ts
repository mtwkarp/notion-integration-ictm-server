import { inject, injectable } from 'inversify';
import AbstractController from '../../AbstractController';
import { IService } from '../../../services/types/interfaces';
import { Types } from '../../../IoC/Types';

@injectable()
export default class SchedulePublishController extends AbstractController {
  constructor(@inject(Types.SchedulePublishService) service: IService) {
    super(service);
  }
}
