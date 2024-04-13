import { Component, OnInit, ViewChild } from '@angular/core';
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
import { PokemonService } from '../../services/pokemon.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild(FilterComponent) filterComponent: FilterComponent | undefined;

  isLoading$: Observable<boolean>;
  pokemonListResults$: Observable<PokemonBasicInfo[]>;
  pokemonCount$: Observable<number>;
  currentPage: number = this.pokemonService.currentPage;

  constructor(
    private store: Store<AppState>,
    private pokemonService: PokemonService
  ) {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.pokemonListResults$ = this.store.select(getPokemonListResultsSelector);
    this.pokemonCount$ = this.store.select(getPokemonsCountSelector);
  }

  ngOnInit(): void {
    this.dispatchGetPokemonList();
  }

  changePage(currentPage: number) {
    if (this.filterComponent) this.filterComponent.resetForm();

    this.currentPage = currentPage;
    this.pokemonService.currentPage = currentPage;
    this.dispatchGetPokemonList();
  }

  dispatchFilter(filterText: string) {
    this.store.dispatch(PokemonActions.filterPokemonList({ filterText }));
  }

  dispatchGetPokemonList() {
    this.store.dispatch(PokemonActions.getPokemonList());
  }
}
