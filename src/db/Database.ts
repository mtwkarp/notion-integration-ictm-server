import { initializeApp } from 'firebase/app';
import { injectable } from 'inversify';
import { IDatabase } from './types/interfacets';

@injectable()
export default class Database implements IDatabase {
  public init(): void {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };

    Database.App = initializeApp(firebaseConfig);
  }

  public getDatabase(): any | never {
    if (Database.App === undefined) {
      throw new Error('Database not initialized. You need to initialize database first.');
    }

    return Database.App;
  }

  private static App: any | undefined;
}
