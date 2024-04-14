import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { TableRowComponent } from './table-row.component';
import { ExtractIdPipe } from '../../pipes/extract-id.pipe';
import { transition } from '@angular/animations';

describe('TableRowComponent', () => {
  let component: TableRowComponent;
  let fixture: ComponentFixture<TableRowComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableRowComponent, ExtractIdPipe],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ExtractIdPipe,
          useValue: { transform: (url: string) => {} },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableRowComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to pokemon detail page when goToPokemonDetail is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const url = 'https://pokeapi.co/api/v2/pokemon/25/';
    const expectedId = '25';

    component.goToPokemonDetail(url);

    expect(navigateSpy).toHaveBeenCalledWith(['/pokemon', expectedId]);
  });
});
