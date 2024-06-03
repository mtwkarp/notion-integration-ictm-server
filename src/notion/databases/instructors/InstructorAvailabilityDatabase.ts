import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { inject, injectable } from 'inversify';
import CMCInstructorAvailabilityDatabase from '../courses/CMCInstructorAvailabilityDatabase';

@injectable()
export default class InstructorAvailabilityDatabase extends AbstractNotionDatabase {}
