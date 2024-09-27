import firebase, {
  collection, doc, getDocs, updateDoc, getFirestore,
} from 'firebase/firestore';
import { inject, injectable } from 'inversify';
import AbstractFSCollection from '../AbstractFSCollection';
import { DBCollectionNames, DBDocumentNames } from './types/enums';
import Database from '../../Database';
import { INDBEditWatcher } from '../../../notion/databases/editWatchers/types/interfaces';
import { ICoursesScheduleNDB } from '../../../notion/databases/coursesSchedule/types/interfaces';
import { IUsersOccupationCollection } from './types/interfaces';
import { Types } from '../../../IoC/Types';

@injectable()
export default class UsersOccupationCollection extends AbstractFSCollection implements IUsersOccupationCollection {
  protected readonly collectionName: string = DBCollectionNames.SCHEDULE;

  protected collectionRef: firebase.CollectionReference<firebase.DocumentData, firebase.DocumentData>;

  protected readonly db: firebase.Firestore;

  private readonly scheduleNDBEditWatcher: INDBEditWatcher;

  private readonly coursesScheduleNDB: ICoursesScheduleNDB;

  constructor(
  @inject(Types.CoursesScheduleNDBEditWatcher) coursesScheduleNDBEditWatcher: INDBEditWatcher,
    @inject(Types.CoursesScheduleNDB) coursesScheduleNDB: ICoursesScheduleNDB,
  ) {
    super();
    this.scheduleNDBEditWatcher = coursesScheduleNDBEditWatcher;
    this.coursesScheduleNDB = coursesScheduleNDB;
    this.db = getFirestore(new Database().getDatabase());
    this.collectionRef = collection(this.db, this.collectionName);
  }

  public startWatchForScheduleDatabasesUpdate(): void {
    this.scheduleNDBEditWatcher.runWatchInterval();
    this.scheduleNDBEditWatcher.subscribeObserver(this.onDatabaseEdit, this);
  }

  private async onDatabaseEdit(): Promise<void> {
    await this.setOccupiedInstructors();
  }

  private async setOccupiedInstructors(): Promise<void> {
    const occupiedUsers = await this.coursesScheduleNDB.getOccupiedInstructorDates();
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
