import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  PokemonBasicInfo,
  PokemonList,
  PokemonRawDescription,
  PokemonRawDetail,
} from '../models/pokemon-list.model';

@Injectable()
export class PokemonService {
  private _currentPage: number = 1;

  constructor(private http: HttpClient) {}

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(pageNumber: number) {
    this._currentPage = pageNumber;
  }

  getPokemons(): Observable<PokemonList> {
    const offset = (this.currentPage - 1) * 20;
    return this.http.get<PokemonList>(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
    );
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

  getPokemonDetail(id: number): Observable<PokemonRawDetail> {
    return this.http.get<PokemonRawDetail>(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    );
  }

  getPokemonDescriptionDetail(id: number): Observable<PokemonRawDescription> {
    return this.http.get<PokemonRawDescription>(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
  }
}
