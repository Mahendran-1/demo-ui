import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private http: HttpClient) {}

    onSubmit() {
        this.errorMessage = ''; // Clear previous error message
        this.successMessage = ''; // Clear success message

        if (!this.username || !this.password) {
            this.errorMessage = 'Please enter both username and password.';
            alert(this.errorMessage); // Show alert message
            return;
        }

        const loginData = { username: this.username, password: this.password };

        this.http.post('http://localhost:8080/api/auth/login', loginData).subscribe(
            (response: any) => {
                if (response && response.token) { // Assuming backend sends a token
                    this.successMessage = 'Login successful! Redirecting...';
                    alert(this.successMessage); // ✅ Show success alert
                    localStorage.setItem('authToken', response.token); // Store token
                    setTimeout(() => {
                        window.location.href = '/dashboard'; // Redirect to dashboard
                    }, 150);
                } else {
                    this.errorMessage = 'Invalid response from server.';
                    alert(this.errorMessage);
                }
            },
            (error) => {
                if (error.status === 401) {
                    this.errorMessage = 'Invalid username or password! Please try again.';
                } else if (error.status === 400) {
                    this.errorMessage = 'Missing credentials. Please fill in all fields.';
                } else {
                    this.errorMessage = 'Username not found! Please try again.';
                }
                alert(this.errorMessage); // ✅ Show error alert
            }
        );
    }
}
