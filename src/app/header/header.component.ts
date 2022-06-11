import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderAction } from './header.beans';

@Component({
  selector: 'ren-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterContentInit {

  @Input() actions: HeaderAction[];
  @Output() actionType: EventEmitter<string> = new EventEmitter<string>();
  startActions: HeaderAction[] = [];
  endActions: HeaderAction[] = [];

  constructor(public router: Router) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (!!this.actions) {
      this.actions.forEach((action: HeaderAction) => {
        if (action.slot === 'start') {
          this.startActions.push(action);
        } else {
          this.endActions.push(action);
        }
      });
    }
  }
}
