import { inject, injectable } from 'inversify';
import AbstractController from '../../AbstractController';
import { IService } from '../../../services/types/interfaces';
import { Types } from '../../../IoC/Types';

@injectable()
export default class CourseInstructorsUpdateController extends AbstractController {
  constructor(@inject(Types.CourseInstructorsUpdateService) service: IService) {
    super(service);
  }
}
