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
