import { PokemonList } from '../models/pokemon-list.model';

export interface PokemonState {
  isLoading: boolean;
  pokemonList: PokemonList;
  error: string | null;
}
