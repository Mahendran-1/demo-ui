import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // ✅ Ensure correct path
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // ✅ Ensure correct path
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(HttpClientModule, FormsModule, ReactiveFormsModule), // ✅ Import form modules
        provideRouter(routes)
    ]
}).catch(err => console.error(err));
