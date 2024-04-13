import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffect } from './store/effects/pokemon.effect';
import { TableRowComponent } from './components/table-row/table-row.component';
import { ExtractIdPipe } from './pipes/extract-id.pipe';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('pokemon', reducers),
    EffectsModule.forFeature([PokemonEffect]),
  ],
  declarations: [HomeComponent, TableRowComponent, ExtractIdPipe],
  exports: [],
})
export class PokemonModule {}
