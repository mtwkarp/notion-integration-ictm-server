import AbstractFSCollection from '../AbstractFSCollection';
import { DBCollectionNames, DBDocumentNames } from './types/enums';
import Database from '../../Database';
import firebase, { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, getFirestore } from 'firebase/firestore';
import { INotionDatabaseEditWatcher } from '../../../notion/databases/editWatchers/types/interfaces';
import CoursesScheduleDatabaseEditWatcher from '../../../notion/databases/editWatchers/implementations/CoursesScheduleDatabaseEditWatcher';
import { ICoursesScheduleDB } from '../../../notion/databases/coursesSchedule/types/interfaces';
import CoursesScheduleDatabase from '../../../notion/databases/coursesSchedule/CoursesScheduleDatabase';
import { IUsersOccupationCollection } from './types/interfaces';

export default class UsersOccupationCollection extends AbstractFSCollection implements IUsersOccupationCollection {
  protected readonly collectionName: string = DBCollectionNames.SCHEDULE;
  protected collectionRef: firebase.CollectionReference<firebase.DocumentData, firebase.DocumentData>;
  protected readonly db: firebase.Firestore;
  private readonly notionScheduleDatabaseEditWatcher: INotionDatabaseEditWatcher = new CoursesScheduleDatabaseEditWatcher();
  private readonly notionScheduleDatabase: ICoursesScheduleDB = new CoursesScheduleDatabase();

  constructor() {
    super();
    this.db = getFirestore(new Database().getApp());
    this.collectionRef = collection(this.db, this.collectionName);
  }

  public startWatchForScheduleDatabasesUpdate() {
    this.notionScheduleDatabaseEditWatcher.runWatchInterval();
    this.notionScheduleDatabaseEditWatcher.subscribeObserver(this.onDatabaseEdit, this);
  }

  private async onDatabaseEdit(): Promise<void> {
    await this.setOccupiedInstructors();
  }

  private async setOccupiedInstructors(): Promise<void> {
    const occupiedUsers = await this.notionScheduleDatabase.getOccupiedInstructorDates();
    const docRef = doc(this.db, this.collectionName, DBDocumentNames.OCCUPATION);

    await updateDoc(docRef, occupiedUsers);
  }

  public async getUsersOccupiedDates(): Promise<Record<string, string[]>> {
    const querySnapshot = await getDocs(this.collectionRef);
    let data: Record<string, string[]> = {};

    querySnapshot.forEach((doc) => {
      if (doc.id === DBDocumentNames.OCCUPATION) {
        data = doc.data();
      }
    });

    return data;
  }
}
