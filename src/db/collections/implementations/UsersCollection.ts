import AbstractFSCollection from '../AbstractFSCollection';
import firebase, { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, getFirestore } from 'firebase/firestore';
import Database from '../../Database';
import { IUsersCollection, IUsersScheduleCollection } from './types/interfaces';
import { DBCollectionNames } from './types/enums';
import { IInstructorsDatabase } from '../../../notion/databases/instructors/types/interfaces';
import InstructorsDatabase from '../../../notion/databases/instructors/InstructorsDatabase';
import { Client } from '@notionhq/client';

export default class UsersCollection extends AbstractFSCollection implements IUsersCollection {
  protected collectionName = DBCollectionNames.USERS;
  private readonly instructorsDatabase: IInstructorsDatabase = new InstructorsDatabase();
  private readonly notionClient: Client = new Client({ auth: process.env.NOTION_KEY });
  protected collectionRef: firebase.CollectionReference<firebase.DocumentData, firebase.DocumentData>;
  protected readonly db: firebase.Firestore;

  constructor() {
    super();
    this.db = getFirestore(new Database().getApp());
    this.collectionRef = collection(this.db, this.collectionName);
  }

  public async getUsersNamesById(): Promise<Record<string, string>> | never {
    const querySnapshot = await getDocs(this.collectionRef);
    const doc = querySnapshot.docs.find((doc) => doc.id === 'names');

    if (doc) {
      return doc.data();
    } else {
      throw new Error('Document with ID "names" not found.');
    }
  }

  public async setUsersNamesById(): Promise<void> {
    // @ts-ignore
    const users = await this.notionClient.users.list();
    const onlyUsers = users.results.filter((user) => {
      return user.type === 'person';
    });
    const namesById: Record<string, string> = {};

    for (let i = 0; i < onlyUsers.length; i++) {
      const userId = onlyUsers[i].id;
      const name: string = await this.instructorsDatabase.getInstructorNameByUserId(userId);

      namesById[userId] = name;
    }

    const docRef = doc(this.db, this.collectionName, 'names');

    await updateDoc(docRef, namesById);
  }
}
