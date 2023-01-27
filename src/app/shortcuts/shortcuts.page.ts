import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'ren-shortcuts',
  templateUrl: './shortcuts.page.html',
  styleUrls: ['./shortcuts.page.scss'],
})
export class ShortcutsPage {

  constructor(private appService: AppService, private router: Router) { }

  shortcutHandler(type: string): void {
    switch (type) {
      case 'unit-cost':
        this.router.navigate(['tabs/unit-cost']);
        break;
      case 'lost-and-found':
        this.router.navigate(['tabs/lost-and-found']);
        break;
      default:
        console.error(`Unknown shortcut type: ${type}`);
    }
  }
}
