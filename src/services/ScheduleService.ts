export default class ScheduleService {
  constructor() {}

  handleRequest(data: any) {
    return {
      message: 'Request received successfully',
      receivedData: data
    };
  }
}
