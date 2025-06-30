import { FormControl } from '@angular/forms';

export interface ContactForm {
  id: FormControl<string>;
  name: FormControl<string>;
  address: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  cell: FormControl<string>;
  registrationDate: FormControl<string>;
  age: FormControl<number>;
  imageUrl: FormControl<string>;
  synced: FormControl<boolean>;
}
