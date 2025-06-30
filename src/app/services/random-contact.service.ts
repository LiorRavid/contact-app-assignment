import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { Observable, map } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class RandomContactService {
  constructor(private http: HttpClient) {}

  getRandomContacts(count = 10): Observable<Contact[]> {
    return this.http.get<any>(`https://randomuser.me/api/?results=${count}`).pipe(
      map(response => {
        return response.results.map((u: any): Contact => ({
          id: uuid(),
          name: `${u.name.first} ${u.name.last}`,
          email: u.email,
          phone: u.phone,
          cell: u.cell,
          address: `${u.location.street.name} ${u.location.street.number}, ${u.location.city}`,
          registrationDate: u.registered.date,
          age: u.dob.age,
          imageUrl: u.picture.medium,
          synced: false
        }));
      })
    );
  }
}
