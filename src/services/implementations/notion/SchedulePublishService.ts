import AbstractService from '../../AbstractService';
import InstructorsDatabase from '../../../notion/databases/instructors/InstructorsDatabase';

export default class SchedulePublishService extends AbstractService {
  constructor() {
    super();

    this.test();
  }

  public async test(): Promise<void> {
    const d = new InstructorsDatabase();

    const r = await d.queryDatabase();

    console.log(r);
  }
}
