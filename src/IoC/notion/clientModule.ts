import { ContainerModule } from 'inversify';

export const clientModule = new ContainerModule(() => {
  // bind<INotionClient>(Types.NotionClient).to(DefaultNotionClient);
});
