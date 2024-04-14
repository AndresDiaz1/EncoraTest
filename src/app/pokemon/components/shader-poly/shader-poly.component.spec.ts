import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaderPolyComponent } from './shader-poly.component';

describe('ShaderPolyComponent', () => {
  let component: ShaderPolyComponent;
  let fixture: ComponentFixture<ShaderPolyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShaderPolyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShaderPolyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
