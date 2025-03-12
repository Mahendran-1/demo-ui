import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-opening',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], //  Ensure HttpClientModule is imported
  templateUrl: './account-opening.component.html',
  styleUrls: ['./account-opening.component.css']
})
export class AccountOpeningComponent {
  accountForm: FormGroup;
  submitted = false;
  accountNumber: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.accountForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      accountType: ['', [Validators.required]],
      initialDeposit: ['', [Validators.required, Validators.min(100)]],
      accountNumber: [{ value: '', disabled: true }] //  Set disabled in TS, not HTML
    });

  }

  get f() {
    return this.accountForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.accountForm.valid) {
      const formData = this.accountForm.getRawValue();

      console.log('Sending data:', formData); //  Log data to console

      this.http.post('http://localhost:8080/api/accounts', formData).subscribe({
        next: (response: any) => {
          this.accountNumber = response.accountNumber;
          alert('Account opened successfully! Account Number: ' + this.accountNumber);
          this.accountForm.reset();
          this.submitted = false;
        },
        error: (error) => {
          console.error('API Error:', error); //  Show backend error
          alert('Failed to open account. Check console for details.');
        }
      });
    }
  }

}
