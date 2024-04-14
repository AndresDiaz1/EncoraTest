import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/appState.model';
import { Observable, Subscription } from 'rxjs';
import {
  getCurrentPokemonDescriptionDetail,
  getCurrentPokemonDetail,
  isLoadingSelector,
} from '../../store/selectors/pokemon.selector';
import * as PokemonActions from '../../store/actions/pokemon.actions';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetail } from '../../models/pokemon-list.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit, OnDestroy {
  routeSub: Subscription | null = null;

  isLoading$: Observable<boolean>;
  pokemonDetail$: Observable<PokemonDetail | null>;
  pokemonDescription$: Observable<string>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.pokemonDetail$ = this.store.select(getCurrentPokemonDetail);
    this.pokemonDescription$ = this.store.select(
      getCurrentPokemonDescriptionDetail
    );
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(PokemonActions.getPokemonDetail({ id: +id }));
        this.store.dispatch(
          PokemonActions.getPokemonDescriptionDetail({ id: +id })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
