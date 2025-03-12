import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-cash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-cash.component.html',
  styleUrls: ['./add-cash.component.css']
})
export class AddCashComponent {
  addCashForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.addCashForm = this.fb.group({
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
    return this.addCashForm.controls;
  }

    fetchAccountDetails() {
      const accountNumber = this.addCashForm.get('accountNumber')?.value;

      if (accountNumber && accountNumber.match(/^ACCT-[A-Z0-9]{8}$/)) {
        this.http.get<any>(`http://localhost:8080/api/accounts/${accountNumber}`).subscribe({
          next: (data) => {
            this.addCashForm.patchValue({
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

    if (this.addCashForm.valid) {
      const cashData = this.addCashForm.getRawValue();
      console.log('Submitting cash data:', cashData);

      this.http.post('http://localhost:8080/api/accounts/add-cash', cashData).subscribe({
        next: (response: any) => {
          alert('Cash added successfully! Transaction ID: ' + response.transactionId);
          this.addCashForm.reset();
          this.submitted = false;
        },
        error: (error) => {
          console.error('API Error:', error);
          alert('Failed to add cash. Check console for details.');
        }
      });
    }
  }
}