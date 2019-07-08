import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../services/pokemon.service';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
export const set = createAction(`[Counter Component] Set Value`, props<{ payload: number }>());
export const getPokemon = createAction(`[Pokemon] Get Pokemon Fetch`, props<{ payload: string | number }>());
export const getPokemonSuccess = createAction(`[Pokemon] Get Pokemon Success`, props<{ payload: Pokemon }>());
export const hydrate = createAction(`[NGRX] Hydrate State`, props<{ payload: any }>());
