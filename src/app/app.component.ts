import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, Route } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { RouterState } from '@ngrx/router-store';

import { Observable } from 'rxjs';
import { increment, decrement, reset, set, getPokemon, hydrate } from './ngrx/counter.actions';
import { Pokemon } from './services/pokemon.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public count$: Observable<number>;
  public pokemon$: Observable<Pokemon>;
  public setValue = 0;
  public pokeQuery = '';

  constructor(
    @Inject(PLATFORM_ID) private platform: object,
    private store: Store<{ root: { count: number, pokemon: Pokemon, router: RouterState } }>,
    private router: Router
  ) { }

  ngOnInit() {
    this.count$ = this.store.pipe(select('root', 'count'));
    this.pokemon$ = this.store.pipe(select('root', 'pokemon'));
    this.store.dispatch(set({ payload: 5 }));
    this.store.pipe(select('router', 'state', 'root', 'firstChild', 'params', 'pokemon'))
      .subscribe(
        res => {
          if (res) {
            this.store.dispatch(getPokemon({ payload: res }));
          }
        },
        complete => { },
        () => { }
      );
  }

  public increment() {
    this.store.dispatch(increment());
  }

  public decrement() {
    this.store.dispatch(decrement());
  }

  public reset() {
    this.store.dispatch(reset());
  }

  public getPoke(query: string): void {
    this.router.navigateByUrl(`/${query}`);
  }

  public set(val: number): void {
    this.store.dispatch(set({ payload: val }));
  }
}
