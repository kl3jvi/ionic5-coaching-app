import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from '../accordion/accordion.component';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WrapperComponent,
        AccordionComponent,
        ExpansionPanelComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.accordion;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hold two expansion panels', () => {
    expect(component.panels.length).toEqual(2);
  });

  it('should open panel that has key', () => {
    component.open('key1');
    expect(component.panels.first.isBodyVisible).toBeTruthy();
    expect(component.panels.last.isBodyVisible).toBeFalsy();
  });

  it('should close all panels when key is missing', () => {
    component.panels.first.isBodyVisible = true;
    component.open('key3');
    expect(component.panels.first.isBodyVisible).toBeFalsy();
    expect(component.panels.last.isBodyVisible).toBeFalsy();
  });

  describe('ngAfterViewInit', () => {
    it('should open panel when toggle is called with true', () => {
      component.ngAfterViewInit();
      component.panels.first.toggle.next(true);
      expect(component.panels.first.isBodyVisible).toBeTruthy();
      expect(component.panels.last.isBodyVisible).toBeFalsy();
    });

    it('should close other panels when one has passed open event', () => {
      component.ngAfterViewInit();
      component.panels.last.isBodyVisible = false;
      component.panels.first.toggle.next(true);
      expect(component.panels.first.isBodyVisible).toBeTruthy();
      expect(component.panels.last.isBodyVisible).toBeFalsy();
    });

    it('should not change anything when false is passed', () => {
      component.ngAfterViewInit();
      component.panels.first.toggle.next(false);
      expect(component.panels.first.isBodyVisible).toBeFalsy();
      expect(component.panels.last.isBodyVisible).toBeFalsy();
    });
  });
});

@Component({
  selector: 'wrapper-component',
  template: `
    <app-accordion #accordion>
      <app-expansion-panel key="key1">
      </app-expansion-panel>
      <app-expansion-panel key="key2">
      </app-expansion-panel>
    </app-accordion>
  `
})
class WrapperComponent {
  @ViewChild('accordion') public accordion: AccordionComponent;
}
