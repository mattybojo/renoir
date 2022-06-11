import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Components } from '@ionic/core';
import { SubSink } from 'subsink';
import { ShoppingListService } from '../shopping-list.service';
import { AppService } from '../../app.service';
import { ShoppingListItem } from '../shopping-list.beans';

@Component({
  selector: 'ren-shopping-list-item-form',
  templateUrl: './shopping-list-item-form.component.html',
  styleUrls: ['./shopping-list-item-form.component.scss'],
})
export class ShoppingListItemFormComponent implements OnInit, OnDestroy {

  @Input() item: ShoppingListItem;
  @Input() modal: Components.IonModal;

  title = 'Add New Item';
  listItemForm: FormGroup;

  private subs = new SubSink();

  constructor(private shoppingListService: ShoppingListService, private appService: AppService) { }

  ngOnInit() {
    if (!!this.item) {
      this.title = `Edit "${this.item.name}"`;
    }

    this.listItemForm = new FormGroup({
      id: new FormControl(this.item?.id),
      name: new FormControl(this.item?.name, [Validators.required]),
      quantity: new FormControl(this.item?.quantity, [Validators.required]),
      isShopped: new FormControl(this.item?.isShopped)
    });
  }

  saveItem() {
    const formItem: ShoppingListItem = this.listItemForm.value;
    if (this.title.includes('Add')) {
      this.subs.sink = this.shoppingListService.addItemToList(formItem).subscribe((resp: DocumentReference<DocumentData>) => {
        this.appService.presentToast({
          color: 'success', message: 'Item saved successfully!', duration: 1000
        });
        this.modal.dismiss();
      }, () => {
        this.appService.presentToast({ color: 'danger', message: 'Error saving item!', duration: 1000 });
      });
    } else {
      this.subs.sink = this.shoppingListService.updateListItem(formItem).subscribe(() => {
        this.appService.presentToast({
          color: 'success', message: 'Item saved successfully!', duration: 1000
        });
        this.modal.dismiss();
      }, () => {
        this.appService.presentToast({ color: 'danger', message: 'Error saving item!', duration: 1000 });
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
