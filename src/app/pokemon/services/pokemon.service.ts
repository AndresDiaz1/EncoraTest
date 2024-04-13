import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PokemonBasicInfo, PokemonList } from '../models/pokemon-list.model';
import { filter as filterrxjs } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<PokemonList> {
    return this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon/');
  }

  filterPokemon(filter: string): Observable<PokemonBasicInfo[]> {
    return this.http
      .get<PokemonList>('https://pokeapi.co/api/v2/pokemon?limit=100000')
      .pipe(
        map((pokemonList) => pokemonList.results),
        map((pokemonResults) =>
          pokemonResults.filter((pokemon) => pokemon.name.includes(filter))
        )
      );
  }
}
