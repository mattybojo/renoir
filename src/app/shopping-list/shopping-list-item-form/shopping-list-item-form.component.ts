import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderAction } from 'src/app/header/header.beans';
import { DataService } from 'src/app/shared/data.service';
import { SubSink } from 'subsink';
import { AppService } from '../../app.service';
import { ShoppingListItem } from '../shopping-list.beans';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'ren-shopping-list-item-form',
  templateUrl: './shopping-list-item-form.component.html',
  styleUrls: ['./shopping-list-item-form.component.scss'],
})
export class ShoppingListItemFormComponent implements OnInit, OnDestroy {

  item: ShoppingListItem;
  headerActions: HeaderAction[];
  title = 'Add New Item';
  listItemForm: FormGroup;

  private subs = new SubSink();

  constructor(private shoppingListService: ShoppingListService, private appService: AppService,
    protected router: Router, private dataService: DataService) {
    this.subs.sink = this.dataService.getDataObs().subscribe((data: any) => {
      this.item = data;
    });
  }

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

    this.headerActions = [{
      type: 'back',
      slot: 'start',
      icon: 'arrow-back-outline'
    }, {
      type: 'save',
      slot: 'start',
      icon: 'save',
      disabled: this.listItemForm?.invalid
    }];

    this.subs.sink = this.listItemForm.valueChanges.subscribe(() => {
      this.headerActions[1].disabled = this.listItemForm.invalid;
    });
  }

  actionHandler(actionType: string) {
    switch (actionType) {
      case 'back':
        this.appService.goBack();
        break;
      case 'save':
        this.saveItem();
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
  }

  saveItem() {
    const formItem: ShoppingListItem = this.listItemForm.value;
    this.appService.presentLoadingModalSave();
    if (this.title.includes('Add')) {
      this.subs.sink = this.shoppingListService.addItemToList(formItem).subscribe((resp: DocumentReference<DocumentData>) => {
        this.appService.dismissLoadingModal();
        this.appService.presentToast({
          color: 'success', message: 'Item saved successfully!', duration: 1000
        });
        this.appService.goBack();
      }, (err) => {
        this.appService.dismissLoadingModal();
        this.appService.presentToast({ color: 'danger', message: 'Error saving item!', duration: 1000 });
      });
    } else {
      this.subs.sink = this.shoppingListService.updateListItem(formItem).subscribe(() => {
        this.appService.dismissLoadingModal();
        this.appService.presentToast({
          color: 'success', message: 'Item saved successfully!', duration: 1000
        });
        this.appService.goBack();
      }, (err) => {
        this.appService.dismissLoadingModal();
        this.appService.presentToast({ color: 'danger', message: 'Error saving item!', duration: 1000 });
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
