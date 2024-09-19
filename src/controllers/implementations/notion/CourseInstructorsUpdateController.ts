import AbstractController from '../../AbstractController';
import { IService } from '../../../services/types/interfaces';
import CourseInstructorsUpdateService from '../../../services/implementations/notion/CourseInstructorsUpdateService';

export default class CourseInstructorsUpdateController extends AbstractController {
  protected service: IService = new CourseInstructorsUpdateService();
}
