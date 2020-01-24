import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelComponent } from './expansion-panel.component';

describe('ExpansionPanelComponent', () => {
  let component: ExpansionPanelComponent;
  let fixture: ComponentFixture<ExpansionPanelComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExpansionPanelComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick', () => {
    it('should change isBodyVisible when onClick is called', () => {
      component.onClick();
      expect(component.isBodyVisible).toBeTruthy();
    });
    it('should call next on toggle when onClick is called', () => {
      const spy = spyOn(component.toggle, 'next');
      component.onClick();
      expect(spy).toHaveBeenCalledWith(true);
    });
  });
});
