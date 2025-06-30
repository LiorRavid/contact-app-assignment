import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Contact } from './contact.model';

interface ContactDB extends DBSchema {
  contacts: {
    key: string;
    value: Contact;
  };
}

let dbPromise: Promise<IDBPDatabase<ContactDB>> | null = null;

export function getContactDB(): Promise<IDBPDatabase<ContactDB>> {
  if (!dbPromise) {
    dbPromise = openDB<ContactDB>('contact-db', 1, {
      upgrade(db) {
        db.createObjectStore('contacts', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}
