import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IService } from '../services/types/interfaces';
import { IController } from './types/interfaces';

@injectable()
export default abstract class AbstractController implements IController {
  protected service: IService;

  constructor(service: IService) {
    this.service = service;
    this.handleRequest = this.handleRequest.bind(this);
  }

  public handleRequest(req: Request, res: Response): void {
    const requestData = req.body;
    const response = this.service.handleRequest(requestData);
    res.status(200).json(response);
  }
}
