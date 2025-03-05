import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountOpeningComponent } from './account-opening.component';

describe('AccountOpeningComponent', () => {
  let component: AccountOpeningComponent;
  let fixture: ComponentFixture<AccountOpeningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountOpeningComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid when required fields are empty', () => {
    component.accountForm.setValue({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      accountType: '',
      initialDeposit: '',
      termsAccepted: false
    });
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    component.accountForm.controls['email'].setValue('invalid-email');
    expect(component.accountForm.controls['email'].valid).toBeFalsy();
  });

  it('should validate phone number format', () => {
    component.accountForm.controls['phone'].setValue('1234');
    expect(component.accountForm.controls['phone'].valid).toBeFalsy();
  });

  it('should validate minimum initial deposit', () => {
    component.accountForm.controls['initialDeposit'].setValue(50);
    expect(component.accountForm.controls['initialDeposit'].valid).toBeFalsy();
  });

  it('should mark the form as valid when all fields are correct', () => {
    component.accountForm.setValue({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St, NY',
      accountType: 'savings',
      initialDeposit: 200,
      termsAccepted: true
    });
    expect(component.accountForm.valid).toBeTruthy();
  });
});
