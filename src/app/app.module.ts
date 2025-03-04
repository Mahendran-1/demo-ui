import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [BrowserModule, HttpClientModule, FormsModule],
    providers: [],
})
export class AppModule {}
