import { createAction, props } from '@ngrx/store';
import {
  PokemonBasicInfo,
  PokemonList,
  PokemonRawDescription,
  PokemonRawDetail,
} from '../../models/pokemon-list.model';

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

export const getPokemonDetail = createAction(
  '[Detail] Get Pokemon Detail',
  props<{ id: number }>()
);

export const getPokemonDetailSuccess = createAction(
  '[Detail] Get Pokemons Detail Success',
  props<PokemonRawDetail>()
);
export const getPokemonDetailFail = createAction(
  '[Detail] Get Pokemons Detail Fail',
  props<{ error: string }>()
);

export const getPokemonDescriptionDetail = createAction(
  '[Detail] Get Pokemon Description Detail',
  props<{ id: number }>()
);

export const getPokemonDescriptionDetailSuccess = createAction(
  '[Detail] Get Pokemons Description Detail Success',
  props<PokemonRawDescription>()
);
export const getPokemonDescriptionDetailFail = createAction(
  '[Detail] Get Pokemons Description Detail Fail',
  props<{ error: string }>()
);
