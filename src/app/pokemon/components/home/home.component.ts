import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PokemonActions from '../../store/actions/pokemon.actions';
import {
  getPokemonListResultsSelector,
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

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.pokemonListResults$ = this.store.select(getPokemonListResultsSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(PokemonActions.getPokemonList());
  }
}
