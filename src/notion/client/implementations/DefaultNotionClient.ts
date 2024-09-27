import { injectable } from 'inversify';
import AbstractNotionClient from '../AbstractNotionClient';

@injectable()
export default class DefaultNotionClient extends AbstractNotionClient {}
