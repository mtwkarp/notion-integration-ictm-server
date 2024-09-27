import { IRequest } from '../../requests/types/interfaces';

export interface IRequestValidator {
  validate(request: IRequest): boolean;
}
