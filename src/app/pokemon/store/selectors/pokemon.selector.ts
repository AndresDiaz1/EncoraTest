import { createSelector } from '@ngrx/store';
import { AppState } from '../../../models/appState.model';

export const selectFeature = (state: AppState) => state.pokemon;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const pokemonListSelector = createSelector(
  selectFeature,
  (state) => state.pokemonList
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

export const getPokemonListResultsSelector = createSelector(
  pokemonListSelector,
  (state) => state.results
);

export const getPokemonsCountSelector = createSelector(
  pokemonListSelector,
  (state) => state.count
);

export const getCurrentPokemonDetail = createSelector(
  selectFeature,
  (state) => state.currentPokemonDetail
);

export const getCurrentPokemonDescriptionDetail = createSelector(
  selectFeature,
  (state) => state.currentPokemonDescription
);
