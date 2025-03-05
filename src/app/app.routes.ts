import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountOpeningComponent } from './account-opening/account-opening.component';
import { AddCashComponent } from './add-cash/add-cash.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DeactivateAccountComponent } from './deactivate-account/deactivate-account.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent }, // Dashboard route
    { path: 'account-opening', component: AccountOpeningComponent },
    { path: 'add-cash', component: AddCashComponent },
    { path: 'withdraw', component: WithdrawComponent },
    { path: 'deactivate-account', component: DeactivateAccountComponent },
];

export const appRouter = provideRouter(routes);
