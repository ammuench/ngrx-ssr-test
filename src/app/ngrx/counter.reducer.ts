import { increment, decrement, reset, set, getPokemon, getPokemonSuccess, hydrate } from './counter.actions';

export const initialState = {
    count: 0,
    pokemon: null,
    loading: false,
};

export function mainReducer(state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case increment.type:
            return Object.assign({}, state, { count: state.count + 1 });
        case decrement.type:
            return Object.assign({}, state, { count: state.count - 1 });
        case set.type:
            return Object.assign({}, state, { count: action.payload });
        case getPokemon.type:
            return Object.assign({}, state, { loading: true });
        case getPokemonSuccess.type:
            return Object.assign({}, state, { pokemon: action.payload, loading: false });
        case reset.type:
            return Object.assign({}, state, { count: 0 });
        case hydrate.type:
            return Object.assign({}, state, { ...action.payload });
        default:
            return state;
    }
};