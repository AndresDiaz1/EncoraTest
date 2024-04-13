import { createAction, props } from '@ngrx/store';
import { PokemonBasicInfo, PokemonList } from '../../models/pokemon-list.model';

export const getPokemonList = createAction('[List] Get Pokemons List');
export const getPokemonListSuccess = createAction(
  '[List] Get Pokemons List Success',
  props<PokemonList>()
);
export const getPokemonListFail = createAction(
  '[List] Get Pokemons List Fail',
  props<{ error: string }>()
);

export const filterPokemonList = createAction(
  '[List] Filter List',
  props<{ filterText: string }>()
);

export const filterPokemonListSuccess = createAction(
  '[List] Filter List Success',
  props<{ pokemonList: PokemonBasicInfo[] }>()
);

export const filterPokemonListFail = createAction(
  '[List] Filter List Fail',
  props<{ error: string }>()
);
