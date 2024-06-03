import { Container, interfaces } from 'inversify';

const dependenciesContainer: interfaces.Container = new Container();

dependenciesContainer.load();

export default dependenciesContainer;
