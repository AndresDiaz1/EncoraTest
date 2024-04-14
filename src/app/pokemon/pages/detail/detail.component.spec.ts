import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { DetailComponent } from './detail.component';
import * as PokemonActions from '../../store/actions/pokemon.actions';
import { Subscription, of } from 'rxjs';
import { PictureComponent } from '../../components/picture/picture.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let store: MockStore;

  const mockActivatedRoute = {
    paramMap: of({
      get: () => '1',
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent, MockComponent(PictureComponent)],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getPokemonDetail and getPokemonDescriptionDetail actions on initialization', () => {
    const getPokemonDetailAction = PokemonActions.getPokemonDetail({ id: 1 });
    const getPokemonDescriptionDetailAction =
      PokemonActions.getPokemonDescriptionDetail({ id: 1 });

    const spyDispatch = spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(spyDispatch).toHaveBeenCalledWith(getPokemonDetailAction);
    expect(spyDispatch).toHaveBeenCalledWith(getPokemonDescriptionDetailAction);
  });

  it('should unsubscribe from route subscription on component destruction', () => {
    const spyUnsubscribe = spyOn<Subscription | null>(
      component.routeSub,
      'unsubscribe' as never
    );
    component.ngOnDestroy();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });
});
