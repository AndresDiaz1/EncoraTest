import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';

import { HomeComponent } from './home.component';
import { PokemonService } from '../../services/pokemon.service';
import { AppState } from '../../../models/appState.model';
import { FilterComponent } from '../../components/filter/filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as PokemonActions from '../../store/actions/pokemon.actions';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  const initialState = {
    isLoading: false,
    pokemonList: [],
    error: null,
    currentPokemonDetail: null,
    currentPokemonDescription: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MockComponent(FilterComponent)],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({})],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            currentPage: 1,
          },
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore<AppState>;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getPokemonList on initialization', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(PokemonActions.getPokemonList());
  });

  it('should reset filter form and dispatch getPokemonList when changePage is called', () => {
    const resetFormSpy = spyOn(component.filterComponent!, 'resetForm');
    const dispatchSpy = spyOn(store, 'dispatch');
    component.changePage(2);
    expect(resetFormSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(PokemonActions.getPokemonList());
  });

  it('should dispatch filterPokemonList when dispatchFilter is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.dispatchFilter('char');
    expect(dispatchSpy).toHaveBeenCalledWith(
      PokemonActions.filterPokemonList({ filterText: 'char' })
    );
  });

  it('should dispatch getPokemonList when dispatchGetPokemonList is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.dispatchGetPokemonList();
    expect(dispatchSpy).toHaveBeenCalledWith(PokemonActions.getPokemonList());
  });
});
