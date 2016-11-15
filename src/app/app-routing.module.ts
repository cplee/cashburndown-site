import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './accounts/account-list.component';
import { BurndownComponent } from './burndown/burndown.component';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './login/login-guard.service';

const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'accounts', component: AccountListComponent, canActivate: [LoginGuard] },
    { path: 'burndown', component: BurndownComponent, canActivate: [LoginGuard] }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
