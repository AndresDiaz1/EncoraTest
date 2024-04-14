import { ExtractIdPipe } from './extract-id.pipe';
import { TestBed } from '@angular/core/testing';

describe('ExtractIdPipe', () => {
  let pipe: ExtractIdPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtractIdPipe],
    });
    pipe = TestBed.inject(ExtractIdPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should extract number from URL with single digit', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/2/';
    const result = pipe.transform(url);
    expect(result).toEqual('2');
  });

  it('should extract number from URL with multiple digits', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/20/';
    const result = pipe.transform(url);
    expect(result).toEqual('20');
  });

  it('should return empty string for invalid URL', () => {
    const url = 'invalid-url';
    const result = pipe.transform(url);
    expect(result).toEqual('');
  });
});
