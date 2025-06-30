import { Injectable } from '@angular/core';
import { ContactService } from './contact.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin, fromEvent, merge, of, switchMap } from 'rxjs';
import { filter, tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SyncService {
  private serverUrl = 'http://localhost:3000/contacts';

  constructor(private contactService: ContactService, private http: HttpClient) {}

    init() {
      merge(of(navigator.onLine), fromEvent(window, 'online'))
        .pipe(
          filter(() => navigator.onLine),
          switchMap(() => this.contactService.getUnsynced()),
          switchMap(contacts => {
            if (contacts.length === 0) return of(null);

            const postRequests = contacts.map(contact =>
              this.http.post(this.serverUrl, contact).pipe(
                switchMap(() => this.contactService.markAsSynced(contact.id)),
                catchError(err => {
                  return of(null);
                })
              )
            );

            return forkJoin(postRequests);
          })
        )
        .subscribe();
  }
}
