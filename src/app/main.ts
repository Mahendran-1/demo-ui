import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // ✅ FIXED: Should match `src/app/app.component.ts`
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // ✅ FIXED: Correct path
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(HttpClientModule),
        provideRouter(routes)
    ]
}).catch(err => console.error(err));
