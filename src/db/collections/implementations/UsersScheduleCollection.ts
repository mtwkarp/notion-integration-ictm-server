import AbstractFSCollection from '../AbstractFSCollection';
import firebase, { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, getFirestore } from 'firebase/firestore';
import Database from '../../Database';
import { IUsersScheduleCollection } from './types/interfaces';
import { DBCollectionNames } from './types/enums';

export default class UsersScheduleCollection extends AbstractFSCollection implements IUsersScheduleCollection {
  protected collectionName = DBCollectionNames.SCHEDULE;
  protected collectionRef: firebase.CollectionReference<firebase.DocumentData, firebase.DocumentData>;
  protected readonly db: firebase.Firestore;

  constructor() {
    super();
    this.db = getFirestore(new Database().getApp());
    this.collectionRef = collection(this.db, this.collectionName);
  }

  public async getUsersSchedule(): Promise<Record<string, string[]>> {
    const querySnapshot = await getDocs(this.collectionRef);
    let data: Record<string, string[]> = {};

    querySnapshot.forEach((doc) => {
      if (doc.id === 'availability') {
        data = doc.data();
      }
    });

    return data;
  }

  public async setUserSchedule(userId: string, schedule: string[]): Promise<void> {
    const docRef = doc(this.db, this.collectionName, 'availability');

    await updateDoc(docRef, {
      [userId]: schedule
    });
  }
}
