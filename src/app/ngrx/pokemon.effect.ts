import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PokemonService } from '../services/pokemon.service';
import { getPokemonSuccess, getPokemon } from './counter.actions';

@Injectable()
export class PokemonEffects {

    getPokemon$ = createEffect(() => this.actions$.pipe(
        ofType(getPokemon),
        mergeMap((action) => this.pokemonService.getPokemon(action.payload)
            .pipe(
                map(pokemon => (getPokemonSuccess({ payload: pokemon }))),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private pokemonService: PokemonService
    ) { }
}