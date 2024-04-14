import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaderPolyComponent } from './shader-poly.component';

describe('ShaderPolyComponent', () => {
  let component: ShaderPolyComponent;
  let fixture: ComponentFixture<ShaderPolyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShaderPolyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShaderPolyComponent);
    component = fixture.componentInstance;
    const pictureElement = document.createElement('div');
    pictureElement.classList.add('picture');
    document.body.appendChild(pictureElement);

    fixture.detectChanges();
  });

  afterEach(() => {
    const pictureElement = document.querySelector('.picture');
    if (pictureElement) {
      pictureElement.remove();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the scene', () => {
    spyOn(component, 'initScene').and.callThrough();
    component.ngOnInit();
    expect(component.initScene).toHaveBeenCalled();
  });

  it('should call createScene on init', () => {
    spyOn(component, 'createScene').and.callThrough();
    component.ngOnInit();
    expect(component.createScene).toHaveBeenCalled();
  });

  it('should remove resize event listener on destroy', () => {
    spyOn(window, 'removeEventListener').and.callThrough();
    component.ngOnDestroy();
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      jasmine.any(Function)
    );
  });
});
