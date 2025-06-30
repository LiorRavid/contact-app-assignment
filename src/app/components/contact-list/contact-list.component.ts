import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { RandomContactService } from '../../services/random-contact.service';
import { LoaderComponent } from "../loader/loader.component";
import { fromEvent, Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-contact-list',
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
    contacts: Contact[] = [];
    isLoading = false;
    private onlineSub?: Subscription;

    constructor(private contactService: ContactService, private router: Router, private randomService: RandomContactService) {}

    ngOnInit(): void {
      this.refresh();

       this.onlineSub = fromEvent(window, 'online').subscribe(() => {
        console.log('[ContactList] Online detected, refreshing...');
        this.refresh();
      });
    }

    goToCreate() {
      this.router.navigate(['/contact/new']);
    }

    goToDetail(id: string) {
      this.router.navigate(['/contact', id]);
    }

    addRandom(): void {
    this.randomService.getRandomContacts().subscribe(contacts => {
      contacts.forEach(contact => {
        this.contactService.save(contact).subscribe();
      });
      setTimeout(() => this.refresh(), 500);
    });
  }

  refresh() {
    this.isLoading = true;
    this.contactService.getAll().subscribe(c => {
      this.contacts = c;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.onlineSub?.unsubscribe();
  }
}
