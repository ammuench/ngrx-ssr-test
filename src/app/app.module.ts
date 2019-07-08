import { BrowserModule, BrowserTransferStateModule, TransferState, makeStateKey } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { mainReducer } from './ngrx/counter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { PokemonEffects } from './ngrx/pokemon.effect';
import { PokemonService, Pokemon } from './services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterState } from '@angular/router';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { hydrate } from './ngrx/counter.actions';

const SERVERSIDE_STORE = makeStateKey('SERVERSIDE_STORE');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    EffectsModule.forRoot([PokemonEffects]),
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      root: mainReducer,
      router: routerReducer,
    }),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot(),
    BrowserTransferStateModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platform: object,
    private store: Store<{ root: { count: number, pokemon: Pokemon, router: RouterState } }>,
    private tState: TransferState,
  ) {
    if (isPlatformServer(platform)) {
      store.subscribe(
        ngrxStore => {
          tState.set(SERVERSIDE_STORE, ngrxStore.root);
        }
      );
    }

    if (isPlatformBrowser(platform)) {
      const hydrated = tState.get(SERVERSIDE_STORE, null as any);
      console.log(hydrated);
      if (!!hydrated) {
        store.dispatch(hydrate({ payload: hydrated }));
      }
    }
  }
}
