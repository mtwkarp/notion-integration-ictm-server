import SchedulePublishService from '../../../services/implementations/notion/SchedulePublishService';
import AbstractController from '../../AbstractController';
import { IService } from '../../../services/types/interfaces';

export default class SchedulePublishController extends AbstractController {
  protected service: IService = new SchedulePublishService();
}
