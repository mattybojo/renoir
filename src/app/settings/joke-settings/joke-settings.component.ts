import { GetResult } from '@capacitor/storage';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Components } from '@ionic/core';
import { StorageService } from 'src/app/shared/storage.service';
import { SubSink } from 'subsink';
import { JokeCategoriesSettings, JokeSettings, JokeWhitelistSettings } from '../settings.beans';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'ren-joke-settings',
  templateUrl: './joke-settings.component.html',
  styleUrls: ['./joke-settings.component.scss'],
})
export class JokeSettingsComponent implements OnInit, OnDestroy {

  @Input() modal: Components.IonModal;
  title = 'Joke Settings';
  categories: JokeCategoriesSettings;
  whitelist: JokeWhitelistSettings;
  isLoading = true;
  isFormValid = true;

  private subs = new SubSink();

  constructor(private storageService: StorageService, private appService: AppService) { }

  // TODO: Implement success and error toasts (on save), close modal on save success (see other components that save data to firestore for reference)

  ngOnInit() {
    this.appService.presentLoadingModal();
    this.subs.sink = this.storageService.getData('jokeSettings').subscribe((value: GetResult) => {
      if (!value.value) {
        this.categories = new JokeCategoriesSettings();
        this.whitelist = new JokeWhitelistSettings();
      } else {
        // Parse back into JSON object
        const jokeSettings: JokeSettings = JSON.parse(value.value);

        // Load category settings and default all to false
        const categorySettings = new JokeCategoriesSettings();
        categorySettings.anyJoke = false;

        // Set category options
        jokeSettings.categories.split(',').forEach((setting: string) => {
          categorySettings[setting] = true;
        });
        this.categories = categorySettings;

        // Load whitelist settings and default all to false
        const whitelistSettings = new JokeWhitelistSettings();

        // Set whitelist options
        jokeSettings.whitelist?.split(',').forEach((setting: string) => {
          whitelistSettings[setting] = true;
        });
        this.whitelist = whitelistSettings;
      }

      this.isLoading = false;
      this.appService.dismissLoadingModal();
    });
  }

  validateForm(): void {
    // Make sure for categories that at least one category is selected
    this.isFormValid = Object.keys(this.categories).some((category: string) => {
      return this.categories[category];
    });
  }

  saveSettings(): void {
    const categories = Object.keys(this.categories).filter((key: string) => this.categories[key])
      .reduce((prev: string, curr: string) => {
        return `${prev},${curr}`;
      });

    let whitelist: string;
    const filteredList = Object.keys(this.whitelist).filter((key: string) => this.categories[key]);
    if (filteredList.length) {
      filteredList.reduce((prev: string, curr: string) => {
        return `${prev},${curr}`;
      });
    }

    const jokeSettings: JokeSettings = {
      categories,
      whitelist
    };

    this.appService.presentLoadingModalSave();
    this.storageService.setData('jokeSettings', JSON.stringify(jokeSettings)).subscribe(() => {
      this.modal.dismiss();
      this.appService.dismissLoadingModal();
      this.appService.presentToast({
        color: 'success', message: 'Settings saved!', duration: 1000
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
