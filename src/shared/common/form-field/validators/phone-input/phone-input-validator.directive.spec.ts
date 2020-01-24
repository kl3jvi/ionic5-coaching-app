// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
// import { FormControl, FormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { FormValidatorsModule } from '../../../../core/form-validators.module';
// import { UserService } from '../../../../modules/core/services/user/user.service';
// import {MockUserService} from '../../../../tests/mock-user-service';
// import { PhoneInputValidatorDirective } from './phone-input-validator.directive';

// describe('Phone Input Validator Directive', () => {

//   let component: TestComponent;
//   let fixture: ComponentFixture<TestComponent>;
//   let field;

//   const elementRefMock = jasmine.createSpyObj('elementRefMock', [
//     'nativeElement'
//   ]);

//   let userService;
//   let directive;

//   beforeEach((() => {
//     TestBed.configureTestingModule({
//       declarations: [TestComponent],
//       imports: [CommonModule, FormsModule, FormValidatorsModule],
//       providers: [
//         { provide: UserService, useClass: MockUserService },
//         { provide: ComponentFixtureAutoDetect, useValue: true },
//       ]
//     });
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestComponent);
//     component = fixture.componentInstance;
//     userService = TestBed.get(UserService);
//     directive = new PhoneInputValidatorDirective(elementRefMock, userService)
//     field = fixture.debugElement.query(By.css('input[name=mobile]')).references.mobilefield;
//   });

//   it('should create an instance', () => {
//     expect(directive).toBeTruthy();
//   });

//   it('should invalidate', async(() => {
//     directive.country = 'GB';
//     const formControl = new FormControl();

//     formControl.setValue('');
//     directive.validate(formControl);

//     expect(field.valid).toBeTruthy();
//   }));

//   it('should validate number beginning with 07', async(() => {
//     directive.country = 'GB';
//     const formControl = new FormControl();

//     formControl.setValue('07399444000');
//     directive.validate(formControl);

//     expect(field.valid).toBeTruthy();
//   }));

//   it('should validate number beginning with 0044', async(() => {
//     directive.country = 'GB';
//     const formControl = new FormControl();

//     formControl.setValue('00447399444000');
//     directive.validate(formControl);

//     expect(field.valid).toBeTruthy();
//   }));

//   it('should validate number beginning with +44', async(() => {
//     directive.country = 'GB';
//     const formControl = new FormControl();

//     formControl.setValue('+447399444000');
//     directive.validate(formControl);

//     expect(field.valid).toBeTruthy();
//   }));
// });

// @Component({
//   template: `
//   <form #form="ngForm">
//     <input name="mobile" #mobilefield="ngModel" [(ngModel)]="mobile" phone>
//   </form>`
// })
// class TestComponent {
//   public mobile: string;
// }
