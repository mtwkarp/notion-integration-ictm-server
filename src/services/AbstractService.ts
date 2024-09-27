import { injectable } from 'inversify';
import { IService } from './types/interfaces';

@injectable()
export default abstract class AbstractService implements IService {
  public handleRequest(data: any): { message: string; receivedData: any } {
    return {
      message: 'Request received successfully',
      receivedData: data,
    };
  }
}
