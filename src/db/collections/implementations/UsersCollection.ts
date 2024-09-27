import firebase, {
  collection, doc, getDocs, updateDoc, getFirestore,
} from 'firebase/firestore';
import { inject, injectable } from 'inversify';
import AbstractFSCollection from '../AbstractFSCollection';
import Database from '../../Database';
import { IUsersCollection } from './types/interfaces';
import { DBCollectionNames } from './types/enums';
import { IInstructorsNDB } from '../../../notion/databases/instructors/types/interfaces';
import { Types } from '../../../IoC/Types';
import { INotionClient } from '../../../notion/client/types/interfaces';
import DefaultNotionClient from '../../../notion/client/implementations/DefaultNotionClient';

@injectable()
export default class UsersCollection extends AbstractFSCollection implements IUsersCollection {
  protected collectionName = DBCollectionNames.USERS;

  private readonly instructorsNDB: IInstructorsNDB;

  private readonly notionClient: INotionClient = new DefaultNotionClient();

  protected collectionRef: firebase.CollectionReference<firebase.DocumentData, firebase.DocumentData>;

  protected readonly db: firebase.Firestore;

  constructor(@inject(Types.InstructorsNDB) instructorsNDB: IInstructorsNDB) {
    super();
    this.instructorsNDB = instructorsNDB;
    this.db = getFirestore(new Database().getDatabase());
    this.collectionRef = collection(this.db, this.collectionName);
  }

  public async getUsersNamesById(): Promise<Record<string, string>> | never {
    const querySnapshot = await getDocs(this.collectionRef);
    const document = querySnapshot.docs.find((el) => el.id === 'names');

    if (document) {
      return document.data();
    }
    throw new Error('Document with ID "names" not found.');
  }

  public async setUsersNamesById(): Promise<void> {
    // @ts-ignore
    const users = await this.notionClient.users.list();
    const onlyUsers = users.results.filter((user) => user.type === 'person');
    const namesById: Record<string, string> = {};

    for (let i = 0; i < onlyUsers.length; i++) {
      const userId = onlyUsers[i].id;
      // eslint-disable-next-line no-await-in-loop
      const name: string = await this.instructorsNDB.getInstructorNameByUserId(userId);

      namesById[userId] = name;
    }

    const docRef = doc(this.db, this.collectionName, 'names');

    await updateDoc(docRef, namesById);
  }
}
