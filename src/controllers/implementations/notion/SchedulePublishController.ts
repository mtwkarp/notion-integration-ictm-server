import ScheduleService from '../../../services/implementations/notion/ScheduleService';
import AbstractController from '../../AbstractController';
import { IService } from '../../../services/types/interfaces';

export default class SchedulePublishController extends AbstractController {
  protected service: IService = new ScheduleService();
}
