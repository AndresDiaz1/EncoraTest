import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { PokemonBasicInfo } from '../../models/pokemon-list.model';
import * as PokemonActions from '../../store/actions/pokemon.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  filterForm: FormGroup = new FormGroup({
    filter: new FormControl(''),
  });

  constructor(private store: Store<PokemonBasicInfo[]>) {
    this.filterForm
      .get('filter')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value) => value.length >= 3 || value.length === 0)
      )
      .subscribe((filterText) => {
        filterText.length >= 3
          ? this.store.dispatch(
              PokemonActions.filterPokemonList({ filterText })
            )
          : this.store.dispatch(PokemonActions.getPokemonList());
      });
  }
}
