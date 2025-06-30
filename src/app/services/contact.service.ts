import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { getContactDB } from '../models/contact-db';

@Injectable({ providedIn: 'root' })
export class ContactService {
  getAll(): Observable<Contact[]> {
    return from(getContactDB().then(db => db.getAll('contacts')));
  }

  getById(id: string): Observable<Contact | undefined> {
    return from(getContactDB().then(db => db.get('contacts', id)));
  }

  save(contact: Contact): Observable<void> {
    return from(getContactDB().then(db => db.put('contacts', contact))).pipe(map(() => void 0));
  }

  delete(id: string): Observable<void> {
    return from(getContactDB().then(db => db.delete('contacts', id))).pipe(map(() => void 0));
  }

  getUnsynced(): Observable<Contact[]> {
    return from(getContactDB().then(db => db.getAll('contacts'))).pipe(
      map(contacts => contacts.filter(c => !c.synced))
    );
  }

  markAsSynced(id: string): Observable<void> {
    return from(getContactDB().then(db => db.get('contacts', id))).pipe(
      switchMap(contact => {
        if (contact) {
          contact.synced = true;
          return from(getContactDB().then(db => db.put('contacts', contact))).pipe(map(() => void 0));
        }
        return of(void 0);
      })
    );
  }
}
