import { Injectable } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PokemonActions from '../actions/pokemon.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PokemonEffect {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

  getPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.getPokemonList),
      mergeMap(() => {
        return this.pokemonService.getPokemons().pipe(
          map(
            (pokemonList) => PokemonActions.getPokemonListSuccess(pokemonList),
            catchError((err) =>
              of(PokemonActions.getPokemonListFail({ error: err.message }))
            )
          )
        );
      })
    )
  );

  filterPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.filterPokemonList),
      mergeMap(({ filterText }) => {
        return this.pokemonService.filterPokemon(filterText).pipe(
          map(
            (pokemonList) =>
              PokemonActions.filterPokemonListSuccess({ pokemonList }),
            catchError((err) =>
              of(PokemonActions.filterPokemonListFail({ error: err.message }))
            )
          )
        );
      })
    )
  );
}
