import { SubSink } from 'subsink';
import { WidgetsService } from './../widgets.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Joke } from '../widgets.beans';

@Component({
  selector: 'ren-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
})
export class JokeComponent implements OnInit, OnDestroy {

  joke: Joke;

  private subs = new SubSink();

  constructor(private widgetsService: WidgetsService) { }

  ngOnInit() {
    this.getNewJoke();
  }

  getNewJoke() {
    this.subs.sink = this.widgetsService.getJoke().subscribe((joke: Joke) => {
      this.joke = joke;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
