export interface PokemonBasicInfo {
  name: string;
  url: string;
}

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonBasicInfo[];
}

export interface PokemonRawDetail {
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}

export interface PokemonDetail {
  name: string;
  weight: number;
  height: number;
  image: string;
  types: PokemonType[];
}

export interface PokemonType {
  name: string;
}
