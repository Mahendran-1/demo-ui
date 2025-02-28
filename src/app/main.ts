import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // ✅ Adjusted import path
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule) // ✅ Import necessary providers
    ]
}).catch(err => console.error(err));
