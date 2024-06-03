import { IService } from './types/interfaces';

export default abstract class AbstractService implements IService {
  public handleRequest(data: any) {
    return {
      message: 'Request received successfully',
      receivedData: data
    };
  }
}
