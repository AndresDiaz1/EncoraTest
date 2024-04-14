import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate and populate pages array when total is provided', () => {
    component.limit = 10;
    component.total = 25;
    component.ngOnChanges({
      total: {
        currentValue: 25,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.pages).toEqual([1, 2, 3]);
  });

  it('should calculate and populate pages array when total and limit are provided', () => {
    component.limit = 5;
    component.total = 35;
    component.ngOnChanges({
      total: {
        currentValue: 35,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.pages).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should not populate pages array when total is not provided', () => {
    component.limit = 10;
    component.total = null;
    component.ngOnChanges({
      total: {
        currentValue: null,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.pages).toEqual([]);
  });

  it('should emit changePage event when changePage method is called', () => {
    const emitSpy = spyOn(component.changePage, 'emit');
    component.changePage.emit(2);
    expect(emitSpy).toHaveBeenCalledWith(2);
  });
});
