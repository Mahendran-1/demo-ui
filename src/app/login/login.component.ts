import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ Must be true
  imports: [CommonModule, FormsModule], // ✅ Import dependencies
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    console.log('Login Attempt:', { username: this.username, password: this.password });
    alert('Login successful!'); // ✅ Placeholder action
  }
}
