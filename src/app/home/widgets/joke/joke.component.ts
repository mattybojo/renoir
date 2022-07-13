import { JokeBlacklistSettings, JokeCategoriesSettings } from './../../../settings/settings.beans';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetResult } from '@capacitor/storage';
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
          blacklist: blacklist.printBlacklist(),
          categories: categories.printCategories()
        };
      }
      this.getNewJoke();
    }, (err) => {
      const blacklist = new JokeBlacklistSettings();
      const categories = new JokeCategoriesSettings();
      this.jokeSettings = {
        blacklist: blacklist.printBlacklist(),
        categories: categories.printCategories()
      };
      this.appService.dismissLoadingModal();
    });
  }

  getNewJoke() {
    this.appService.presentLoadingModal();
    this.subs.sink = this.widgetsService.getJoke(this.jokeSettings).subscribe((joke: Joke) => {
      this.joke = joke;
      this.appService.dismissLoadingModal();
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({ color: 'danger', message: 'Error retrieving joke.', duration: 1000 });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
