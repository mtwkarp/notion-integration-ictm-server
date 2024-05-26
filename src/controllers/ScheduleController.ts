import { Request, Response } from 'express';
import ScheduleService from '../services/ScheduleService';

export default class ScheduleController {
  private service: ScheduleService;

  constructor() {
    this.service = new ScheduleService();
    this.handleRequest = this.handleRequest.bind(this);
  }

  handleRequest(req: Request, res: Response) {
    const requestData = req.body;
    const response = this.service.handleRequest(requestData);
    res.status(200).json(response);
  }
}
