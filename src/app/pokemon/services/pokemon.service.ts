import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonList } from '../models/pokemon-list.model';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<PokemonList> {
    return this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon/');
  }
}
