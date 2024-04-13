import { createReducer, on } from '@ngrx/store';
import { PokemonState } from '../initial-state.model';
import * as PokemonActions from '../actions/pokemon.actions';

export const initialState: PokemonState = {
  isLoading: false,
  pokemonList: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(PokemonActions.getPokemonList, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PokemonActions.getPokemonListSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    pokemonList: action,
  })),
  on(PokemonActions.getPokemonListFail, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(PokemonActions.filterPokemonList, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PokemonActions.filterPokemonListSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    pokemonList: {
      ...state.pokemonList,
      results: action.pokemonList,
    },
  })),
  on(PokemonActions.filterPokemonListFail, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
