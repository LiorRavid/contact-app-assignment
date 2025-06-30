import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { ContactService } from '../../services/contact.service';
import { ContactForm } from '../../models/contact-form-group.model';

@Component({
  standalone: true,
  selector: 'app-contact-detail',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  form!: FormGroup<ContactForm>;

  isNew = false;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || id === 'new') {
      this.isNew = true;
      this.isEdit = true;
      this.form.patchValue({
        id: uuid(),
        registrationDate: new Date().toISOString(),
        imageUrl: 'https://via.placeholder.com/100',
        synced: false
      });
    } else {
      this.contactService.getById(id).subscribe(contact => {
        if (contact) this.form.patchValue(contact);
      });
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      id: this.fb.control('', { nonNullable: true }),
      name: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
      address: this.fb.control('', { nonNullable: true }),
      email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      phone: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{9,10}$/)] }),
      cell: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{9,10}$/)] }),
      registrationDate: this.fb.control('', { nonNullable: true }),
      age: this.fb.control(0, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(120)] }),
      imageUrl: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^https?:\/\/.+/)] }),
      synced: this.fb.control(false, { nonNullable: true })
    });
  }

  save(): void {
    this.contactService.save(this.form.getRawValue()).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  edit(): void {
    this.isEdit = true;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  delete(): void {
    if (!this.isNew) {
      const id = this.form.controls.id.value;
      this.contactService.delete(id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
