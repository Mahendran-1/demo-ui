import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component'; // ✅ Corrected path

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect root to login
    { path: 'login', component: LoginComponent },
];

export const appRouter = provideRouter(routes);
