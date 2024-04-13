import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  @Output() dispatchFilter = new EventEmitter<string>();
  @Output() dispatchGetPokemonList = new EventEmitter<void>();

  filterForm: FormGroup = new FormGroup({
    filter: new FormControl(''),
  });

  constructor() {
    this.filterForm
      .get('filter')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value) => value.length >= 3 || value.length === 0)
      )
      .subscribe((filterText) => {
        filterText.length >= 3
          ? this.dispatchFilter.emit(filterText)
          : this.dispatchGetPokemonList.emit();
      });
  }
}
