import firebase from 'firebase/firestore';
import Database from '../Database';

export default abstract class AbstractFSCollection {
  protected abstract readonly collectionName: string;
  protected abstract collectionRef: firebase.CollectionReference<firebase.DocumentData, firebase.DocumentData>;
}
