export interface IService {
  handleRequest(data: any): { message: string };
}
