import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AccountOpeningComponent } from './account-opening/account-opening.component';
import { AppComponent } from './app.component'; // ✅ Import standalone component

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppComponent // ✅ Import AppComponent instead of declaring it
    ],
    providers: [],
})
export class AppModule {}
