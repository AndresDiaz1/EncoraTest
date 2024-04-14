import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PokemonModule } from './pokemon/pokemon.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PokemonService } from './pokemon/services/pokemon.service';
import { HeaderComponent } from './components/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PokemonModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterTestingModule,
      ],
      declarations: [AppComponent, HeaderComponent],
      providers: [
        {
          provide: PokemonService,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
