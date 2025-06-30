import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SyncService } from './services/sync.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {
    constructor(private syncService: SyncService) {}

  ngOnInit(): void {
    this.syncService.init();
  }
}
