import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PokemonActions from '../../store/actions/pokemon.actions';
import {
  getPokemonListResultsSelector,
  getPokemonsCountSelector,
  isLoadingSelector,
} from '../../store/selectors/pokemon.selector';
import { Observable } from 'rxjs';
import { AppState } from '../../../models/appState.model';
import { PokemonBasicInfo } from '../../models/pokemon-list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isLoading$: Observable<boolean>;
  pokemonListResults$: Observable<PokemonBasicInfo[]>;
  pokemonCount$: Observable<number>;
  currentPage: number = 1;
  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.pokemonListResults$ = this.store.select(getPokemonListResultsSelector);
    this.pokemonCount$ = this.store.select(getPokemonsCountSelector);
  }

  ngOnInit(): void {
    this.dispatchGetPokemonList();
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  dispatchFilter(filterText: string) {
    this.store.dispatch(PokemonActions.filterPokemonList({ filterText }));
  }

  dispatchGetPokemonList() {
    this.store.dispatch(PokemonActions.getPokemonList());
  }
}
