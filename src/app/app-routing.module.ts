import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list.component';
import {LoginComponent} from './login.component';
import {LoginGuard} from './login-guard.service';

const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'accounts', component: AccountListComponent, canActivate: [LoginGuard] }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
