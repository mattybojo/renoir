import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GetResult } from '@capacitor/storage';
import { Components } from '@ionic/core';
import { AppService } from 'src/app/app.service';
import { StorageService } from 'src/app/shared/storage.service';
import { SubSink } from 'subsink';
import { JokeBlacklistSettings, JokeCategoriesSettings, JokeSettings } from '../settings.beans';

@Component({
  selector: 'ren-joke-settings',
  templateUrl: './joke-settings.component.html',
  styleUrls: ['./joke-settings.component.scss'],
})
export class JokeSettingsComponent implements OnInit, OnDestroy {

  @Input() modal: Components.IonModal;

  title = 'Joke Settings';
  categories: JokeCategoriesSettings;
  blacklist: JokeBlacklistSettings;
  isLoading = false;
  isFormValid = true;

  private subs = new SubSink();

  constructor(private storageService: StorageService, private appService: AppService) { }

  ngOnInit() {
    this.isLoading = true;
    this.subs.sink = this.storageService.getData('jokeSettings').subscribe((data: GetResult) => {
      if (!data.value) {
        this.categories = new JokeCategoriesSettings();
        this.blacklist = new JokeBlacklistSettings();
      } else {
        // Parse back into JSON object
        const jokeSettings: JokeSettings = JSON.parse(data.value);

        // Load category settings and default all to false
        const categorySettings = new JokeCategoriesSettings();
        categorySettings.AnyJoke = false;

        // Set category options
        jokeSettings.categories.split(',').forEach((setting: string) => {
          categorySettings[setting] = true;
        });
        this.categories = categorySettings;

        // Load blacklist settings and default all to false
        const blacklistSettings = new JokeBlacklistSettings();

        // Set blacklist options
        jokeSettings.blacklist?.split(',').forEach((setting: string) => {
          blacklistSettings[setting] = true;
        });
        this.blacklist = blacklistSettings;
      }
      this.isLoading = false;
    }, (err) => {
      this.blacklist = new JokeBlacklistSettings();
      this.categories = new JokeCategoriesSettings();
      this.isLoading = false;
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

    let blacklist = '';
    const filteredList = Object.keys(this.blacklist).filter((key: string) => !this.categories[key]);
    if (filteredList.length) {
      blacklist = filteredList.join(',');
    }

    const jokeSettings: JokeSettings = {
      categories,
      blacklist
    };

    this.appService.presentLoadingModalSave();
    this.subs.sink = this.storageService.setData('jokeSettings', JSON.stringify(jokeSettings)).subscribe(() => {
      this.modal.dismiss();
      this.appService.dismissLoadingModal();
      this.appService.presentToast({
        color: 'success', message: 'Settings saved!', duration: 1000
      });
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({ color: 'danger', message: 'Unable to save settings.  Please try again.', duration: 1000 });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
