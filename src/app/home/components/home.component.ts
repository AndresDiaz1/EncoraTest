import { Component, OnInit } from '@angular/core';
import { InitialState } from '@ngrx/store/src/models';
import { Store } from '@ngrx/store';
import * as PokemonActions from '../../pokemon/store/actions/pokemon.actions';
import { PokemonState } from '../../pokemon/store/initial-state.model';
import { isLoadingSelector } from '../../pokemon/store/selectors/pokemon.selector';
import { Observable } from 'rxjs';
import { AppState } from '../../models/appState.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(isLoadingSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(PokemonActions.getPokemonList());
  }
}
