import { Request, Response } from 'express';
import { IService } from '../services/types/interfaces';
import { IController } from './types/interfaces';

export default abstract class AbstractController implements IController {
  protected abstract service: IService;

  constructor() {
    this.handleRequest = this.handleRequest.bind(this);
  }

  public handleRequest(req: Request, res: Response): void {
    const requestData = req.body;
    const response = this.service.handleRequest(requestData);
    res.status(200).json(response);
  }
}
