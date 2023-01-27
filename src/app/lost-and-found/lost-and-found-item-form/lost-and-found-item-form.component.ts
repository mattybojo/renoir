import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AppService } from 'src/app/app.service';
import { HeaderAction } from 'src/app/header/header.beans';
import { DataService } from 'src/app/shared/data.service';
import { SubSink } from 'subsink';
import { LostAndFoundItem } from './../lost-and-found.beans';
import { LostAndFoundService } from './../lost-and-found.service';

@Component({
  selector: 'ren-lost-and-found-item-form',
  templateUrl: './lost-and-found-item-form.component.html',
  styleUrls: ['./lost-and-found-item-form.component.scss'],
})
export class LostAndFoundItemFormComponent implements OnInit, OnDestroy {

  item: LostAndFoundItem;
  headerActions: HeaderAction[];
  title = 'Add New Item';
  listItemForm: FormGroup;
  numTextAreaRows: number;

  private subs = new SubSink();

  constructor(private lostAndFoundService: LostAndFoundService, private appService: AppService,
    protected router: Router, private dataService: DataService, private platform: Platform) {
    // Make sure textarea at bottom of page fills page and does not overflow
    this.platform.ready().then(() => {
      // Header: 44px; Rows: 44px, 51px; Footer: 50px; Row padding: 20px
      this.numTextAreaRows = (platform.height() - (50 + 44 + 51 + 50 + 20)) / 20;
    });
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
      location: new FormControl(this.item?.location)
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
    const formItem: LostAndFoundItem = this.listItemForm.value;
    this.appService.presentLoadingModalSave();
    if (this.title.includes('Add')) {
      this.subs.sink = this.lostAndFoundService.addItem(formItem).subscribe((resp: DocumentReference<DocumentData>) => {
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
      this.subs.sink = this.lostAndFoundService.updateItem(formItem).subscribe(() => {
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
