import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit dispatchFilter event when filter length is >= 3', fakeAsync(() => {
    const filterInput = fixture.debugElement.query(By.css('input'));
    const spyDispatchFilter = spyOn(component.dispatchFilter, 'emit');

    filterInput.nativeElement.value = 'char';
    filterInput.nativeElement.dispatchEvent(new Event('input'));

    tick(500);

    expect(spyDispatchFilter).toHaveBeenCalledWith('char');
  }));

  it('should emit dispatchGetPokemonList event when filter length is less than 3', fakeAsync(() => {
    const filterInput = fixture.debugElement.query(By.css('input'));
    const spyDispatchGetPokemonList = spyOn(
      component.dispatchGetPokemonList,
      'emit'
    );

    filterInput.nativeElement.value = '';
    filterInput.nativeElement.dispatchEvent(new Event('input'));

    tick(500);
    expect(spyDispatchGetPokemonList).toHaveBeenCalled();
  }));

  it('should reset form when resetForm method is called', () => {
    component.filterForm.setValue({ filter: 'char' });
    expect(component.filterForm.get('filter')?.value).toBe('char');

    component.resetForm();
    expect(component.filterForm.get('filter')?.value).toBe(null);
  });
});
