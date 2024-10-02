import firebase, {
  collection, doc, getDocs, updateDoc, getFirestore,
} from 'firebase/firestore';
import { inject, injectable } from 'inversify';
import AbstractFSCollection from '../AbstractFSCollection';
import { DBCollectionNames, DBDocumentNames } from './types/enums';
import Database from '../../Database';
import { INDBEditWatcher } from '../../../notion/databases/editWatchers/types/interfaces';
import {
  ICoursesScheduleNDBDataGetter,
  ICoursesScheduleNDBModifier
} from '../../../notion/databases/coursesSchedule/types/interfaces';
import { IUsersOccupationCollection } from './types/interfaces';
import { Types } from '../../../IoC/Types';

@injectable()
export default class UsersOccupationCollection extends AbstractFSCollection implements IUsersOccupationCollection {
  protected readonly collectionName: string = DBCollectionNames.SCHEDULE;

  protected collectionRef: firebase.CollectionReference<firebase.DocumentData, firebase.DocumentData>;

  protected readonly db: firebase.Firestore;

  private readonly scheduleNDBEditWatcher: INDBEditWatcher;

  private readonly coursesScheduleNDBDataGetter: ICoursesScheduleNDBDataGetter;

  private isWatching: boolean = false

  constructor(
  @inject(Types.CoursesScheduleNDBEditWatcher) coursesScheduleNDBEditWatcher: INDBEditWatcher,
    @inject(Types.CoursesScheduleNDBDataGetter) coursesScheduleNDBDataGetter: ICoursesScheduleNDBDataGetter,
  ) {
    super();
    this.scheduleNDBEditWatcher = coursesScheduleNDBEditWatcher;
    this.coursesScheduleNDBDataGetter = coursesScheduleNDBDataGetter;
    this.db = getFirestore(new Database().getDatabase());
    this.collectionRef = collection(this.db, this.collectionName);
  }

  public startWatchForScheduleDatabasesUpdate(): void {
    if(this.isWatching) {
      return
    }

    this.isWatching = true
    this.scheduleNDBEditWatcher.runWatchInterval();
    this.scheduleNDBEditWatcher.subscribeObserver(this.onDatabaseEdit, this);
  }

  private async onDatabaseEdit(): Promise<void> {
    await this.setOccupiedInstructors();
  }

  private async setOccupiedInstructors(): Promise<void> {
    const occupiedUsers = await this.coursesScheduleNDBDataGetter.getOccupiedInstructorDates();
    const docRef = doc(this.db, this.collectionName, DBDocumentNames.OCCUPATION);

    await updateDoc(docRef, occupiedUsers);
  }

  public async getUsersOccupiedDates(): Promise<Record<string, string[]>> {
    const querySnapshot = await getDocs(this.collectionRef);
    let data: Record<string, string[]> = {};

    querySnapshot.forEach((document) => {
      if (document.id === DBDocumentNames.OCCUPATION) {
        data = document.data();
      }
    });

    return data;
  }
}
