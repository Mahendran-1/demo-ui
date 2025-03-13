import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deactivate-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './deactivate-account.component.html',
  styleUrls: ['./deactivate-account.component.css']
})
export class DeactivateAccountComponent {
  deactivateForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.deactivateForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.pattern('^ACCT-[A-Z0-9]{8}$')]],
      fullName: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      accountType: [{ value: '', disabled: true }],
      initialDeposit: [{ value: '', disabled: true }],
      remarks: ['']
    });
  }

  get f() {
    return this.deactivateForm.controls;
  }

  fetchAccountDetails() {
    const accountNumber = this.deactivateForm.get('accountNumber')?.value;

    if (accountNumber && accountNumber.match(/^ACCT-[A-Z0-9]{8}$/)) {
      this.http.get<any>(`http://localhost:8080/api/accounts/${accountNumber}`).subscribe({
        next: (data) => {
          this.deactivateForm.patchValue({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            accountType: data.accountType,
            initialDeposit: data.initialDeposit
          });
        },
        error: (err) => {
          console.error('Fetch account details error:', err);
          alert('Account not found or error occurred.');
        }
      });
    }
  }

  onDeactivate() {
    this.submitted = true;

    if (this.deactivateForm.valid) {
      const deactivationData = this.deactivateForm.getRawValue();
      console.log('Submitting deactivation request:', deactivationData);

      this.http.post('http://localhost:8080/api/accounts/deactivate', deactivationData).subscribe({
        next: (response: any) => {
          alert('Account deactivated successfully! Confirmation ID: ' + response.confirmationId);
          this.deactivateForm.reset();
          this.submitted = false;
        },
        error: (error) => {
          console.error('API Error:', error);
          alert('Failed to deactivate account. Check console for details.');
        }
      });
    }
  }
}
