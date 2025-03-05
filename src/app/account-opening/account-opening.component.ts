import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-opening',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Import ReactiveFormsModule
  templateUrl: './account-opening.component.html',
  styleUrls: ['./account-opening.component.css']
})
export class AccountOpeningComponent {
  accountForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      initialDeposit: ['', [Validators.required, Validators.min(100)]],
      termsAccepted: [false, [Validators.requiredTrue]]
    });
  }

  get f() {
    return this.accountForm.controls; // ✅ Ensure 'controls' is returned
  }

  onSubmit() {
    this.submitted = true;
    if (this.accountForm.valid) {
      console.log('Account Opening Data:', this.accountForm.value);
      alert('Account opened successfully!');
      this.accountForm.reset();
      this.submitted = false;
    }
  }
}
