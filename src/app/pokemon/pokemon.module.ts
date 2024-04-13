import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffect } from './store/effects/pokemon.effect';
import { TableRowComponent } from './components/table-row/table-row.component';
import { ExtractIdPipe } from './pipes/extract-id.pipe';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/table/table.component';
import { FilterComponent } from './components/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('pokemon', reducers),
    EffectsModule.forFeature([PokemonEffect]),
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
    TableRowComponent,
    ExtractIdPipe,
    TableComponent,
    FilterComponent,
  ],
})
export class PokemonModule {}
