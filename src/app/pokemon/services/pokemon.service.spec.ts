import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import {
  PokemonList,
  PokemonRawDescription,
  PokemonRawDetail,
} from '../models/pokemon-list.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected Pokemon list from getPokemons', () => {
    const expectedPokemons: PokemonList = {
      count: 20,
      next: 'null',
      previous: 'null',
      results: [],
    };

    service.getPokemons().subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpTestingController.expectOne(
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
    );
    expect(req.request.method).toEqual('GET');

    req.flush(expectedPokemons);
  });

  it('should return filtered Pokemon list from filterPokemon', () => {
    const filter = 'char';
    const expectedFilteredPokemon: any = [
      { name: 'charmander' },
      { name: 'charizard' },
    ];

    service.filterPokemon(filter).subscribe((filteredPokemon) => {
      expect(filteredPokemon).toEqual(expectedFilteredPokemon);
    });

    const req = httpTestingController.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=100000'
    );
    expect(req.request.method).toEqual('GET');

    req.flush({ results: expectedFilteredPokemon });
  });

  it('should return expected Pokemon detail from getPokemonDetail', () => {
    const id = 25;
    const expectedPokemonDetail: PokemonRawDetail = {
      sprites: { front_default: '' },
      types: [],
      name: 'pikachu',
      height: 4,
      weight: 60,
    };

    service.getPokemonDetail(id).subscribe((pokemonDetail) => {
      expect(pokemonDetail).toEqual(expectedPokemonDetail);
    });

    const req = httpTestingController.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(expectedPokemonDetail);
  });

  it('should return expected Pokemon description detail from getPokemonDescriptionDetail', () => {
    const id = 25;
    const expectedPokemonDescriptionDetail: PokemonRawDescription = {
      flavor_text_entries: [],
    };

    service
      .getPokemonDescriptionDetail(id)
      .subscribe((pokemonDescriptionDetail) => {
        expect(pokemonDescriptionDetail).toEqual(
          expectedPokemonDescriptionDetail
        );
      });

    const req = httpTestingController.expectOne(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(expectedPokemonDescriptionDetail);
  });
});
