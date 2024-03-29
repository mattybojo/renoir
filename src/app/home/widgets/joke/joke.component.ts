import { JokeBlacklistSettings, JokeCategoriesSettings } from './../../../settings/settings.beans';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetResult } from '@capacitor/preferences';
import { AppService } from 'src/app/app.service';
import { JokeSettings } from 'src/app/settings/settings.beans';
import { StorageService } from 'src/app/shared/storage.service';
import { SubSink } from 'subsink';
import { Joke } from '../widgets.beans';
import { WidgetsService } from './../widgets.service';

@Component({
  selector: 'ren-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
})
export class JokeComponent implements OnInit, OnDestroy {

  joke: Joke;
  jokeSettings: JokeSettings;
  isLoading = false;

  private subs = new SubSink();

  constructor(private widgetsService: WidgetsService, private appService: AppService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.subs.sink = this.storageService.getData('jokeSettings').subscribe((data: GetResult) => {
      if (data.value) {
        this.jokeSettings = JSON.parse(data.value);
      } else {
        const blacklist = new JokeBlacklistSettings();
        const categories = new JokeCategoriesSettings();
        this.jokeSettings = {
          blacklist: blacklist.getSettings(),
          categories: categories.getSettings()
        };
      }
      this.getNewJoke();
    }, (err) => {
      const blacklist = new JokeBlacklistSettings();
      const categories = new JokeCategoriesSettings();
      this.jokeSettings = {
        blacklist: blacklist.getSettings(),
        categories: categories.getSettings()
      };
      this.appService.dismissLoadingModal();
    });
  }

  getNewJoke() {
    this.isLoading = true;
    this.subs.sink = this.widgetsService.getJoke(this.jokeSettings).subscribe((joke: Joke) => {
      this.joke = joke;
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.appService.presentToast({ color: 'danger', message: 'Error retrieving joke.', duration: 1000 });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
