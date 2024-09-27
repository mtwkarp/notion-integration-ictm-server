import firebase from 'firebase/firestore';
import { injectable } from 'inversify';

@injectable()
export default abstract class AbstractFSCollection {
  protected abstract readonly collectionName: string;

  protected abstract collectionRef: firebase.CollectionReference<firebase.DocumentData, firebase.DocumentData>;
}
