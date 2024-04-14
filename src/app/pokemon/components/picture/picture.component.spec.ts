import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { PictureComponent } from './picture.component';
import { ShaderPolyComponent } from '../shader-poly/shader-poly.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PictureComponent, MockComponent(ShaderPolyComponent)],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
