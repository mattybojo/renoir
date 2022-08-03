import { JokeComponent } from './../home/widgets/joke/joke.component';
import { Component } from '@angular/core';
import { ModalOptions } from '@ionic/angular';
import { AppService } from 'src/app/app.service';
import { ComponentProps, ComponentRef } from '../app.beans';
import { UnitCostComparePage } from './../unit-cost-compare/unit-cost-compare.page';

@Component({
  selector: 'ren-shortcuts',
  templateUrl: './shortcuts.page.html',
  styleUrls: ['./shortcuts.page.scss'],
})
export class ShortcutsPage {

  constructor(private appService: AppService) { }

  shortcutHandler(type: string): void {
    switch (type) {
      case 'unit-cost':
        this.presentModal(UnitCostComparePage);
        break;
      default:
        console.error(`Unknown shortcut type: ${type}`);
    }
  }

  async presentModal(compRef: ComponentRef, props?: ComponentProps<ComponentRef>): Promise<void> {
    const modalOpts: ModalOptions = {
      component: compRef,
      componentProps: props,
      presentingElement: await this.appService.getModalPresentingElement(),
      canDismiss: true
    };

    this.appService.presentModal(modalOpts);
  }
}
