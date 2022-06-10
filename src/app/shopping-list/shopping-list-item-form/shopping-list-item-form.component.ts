import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Components } from '@ionic/core';
import { SubSink } from 'subsink';
import { ShoppingListService } from '../shopping-list.service';
import { ShoppingListItem } from './../shopping-list.beans';

@Component({
  selector: 'ren-shopping-list-item-form',
  templateUrl: './shopping-list-item-form.component.html',
  styleUrls: ['./shopping-list-item-form.component.scss'],
})
export class ShoppingListItemFormComponent implements OnInit, OnDestroy {

  @Input() item: ShoppingListItem;
  @Input() modal: Components.IonModal;

  title = 'Add New Item';

  modalItem: ShoppingListItem;

  private subs = new SubSink();

  constructor(private shoppingListService: ShoppingListService, private toastController: ToastController) { }

  ngOnInit() {
    if (!!this.item) {
      this.title = `Edit "${this.item.name}"`;
      this.modalItem = Object.assign({}, this.item);
    }
  }

  saveItem() {
    if (this.title.includes('Add')) {
      this.subs.sink = this.shoppingListService.addItemToList(this.modalItem).subscribe((resp: DocumentReference<DocumentData>) => {
        this.modalItem.id = resp.id;
        this.modal.dismiss(this.modalItem);
      }, () => {
        this.toastController.create({ color: 'danger', message: 'Error saving item!' });
      });
    } else {
      this.subs.sink = this.shoppingListService.updateListItem(this.modalItem).subscribe(() => {
        this.modal.dismiss(this.modalItem);
      }, () => {
        this.toastController.create({ color: 'danger', message: 'Error saving item!' });
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
