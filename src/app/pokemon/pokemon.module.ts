import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffect } from './store/effects/pokemon.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('pokemon', reducers),
    EffectsModule.forFeature([PokemonEffect]),
  ],
  declarations: [],
})
export class PokemonModule {}
