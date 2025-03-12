import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-withdraw-cash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
  withdrawCashForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.withdrawCashForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.pattern('^ACCT-[A-Z0-9]{8}$')]],
      fullName: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      phone: [{value: '', disabled: true}],
      accountType: [{value: '', disabled: true}],
      initialDeposit: [{value: '', disabled: true}],
      amount: ['', [Validators.required, Validators.min(10)]],
      remarks: ['']
    });
  }

  get f() {
    return this.withdrawCashForm.controls;
  }

  fetchAccountDetails() {
    const accountNumber = this.withdrawCashForm.get('accountNumber')?.value;

    if (accountNumber && accountNumber.match(/^ACCT-[A-Z0-9]{8}$/)) {
      this.http.get<any>(`http://localhost:8080/api/accounts/${accountNumber}`).subscribe({
        next: (data) => {
          this.withdrawCashForm.patchValue({
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

  onSubmit() {
    this.submitted = true;

    if (this.withdrawCashForm.valid) {
      const withdrawData = this.withdrawCashForm.getRawValue();
      console.log('Submitting withdrawal data:', withdrawData);

      this.http.post('http://localhost:8080/api/accounts/withdraw-cash', withdrawData).subscribe({
        next: (response: any) => {
          alert('Withdrawal successful! Transaction ID: ' + response.transactionId);
          this.withdrawCashForm.reset();
          this.submitted = false;
        },
        error: (error) => {
          console.error('API Error:', error);
          alert('Failed to withdraw cash. Check console for details.');
        }
      });
    }
  }
}
