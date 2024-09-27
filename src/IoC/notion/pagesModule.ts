import { ContainerModule, interfaces } from 'inversify';
import { Types } from '../Types';
import NotionCoursePage from '../../notion/pages/courses/NotionCoursePage';
import { INotionCoursePage } from '../../notion/pages/types/interfaces';

export const pagesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<INotionCoursePage>(Types.NotionCoursePage).to(NotionCoursePage);
});
