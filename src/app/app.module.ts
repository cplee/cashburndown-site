import { NgModule, ErrorHandler }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent }         from './app.component';
import { LoginComponent }       from './login/login.component';
import { LogoutComponent }       from './login/logout.component';
import { AccountListComponent } from './accounts/account-list.component';
import { AccountAddComponent } from './accounts/account-add.component';
import { AccountDeleteComponent } from './accounts/account-delete.component';
import { AccountBurndownComponent } from './accounts/account-burndown.component';
import { AppRoutingModule }     from './app-routing.module';
import { MaterialModule }       from '@angular/material';
import { AccountsService } from "./accounts/accounts.service";
import { LoginGuard } from "./login/login-guard.service";
import {ProgressService} from "./util/progress.service";
import {ProgressComponent} from "./util/progress.component";
import {FormsModule} from '@angular/forms';
import {BurndownComponent} from "./burndown/burndown.component";



@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        ProgressComponent,
        BurndownComponent,
        AccountListComponent,
        AccountAddComponent,
        AccountDeleteComponent,
        AccountBurndownComponent
    ],
    providers: [
      {provide: ErrorHandler, useClass: ProgressService},
      AccountsService,
      ProgressService,
      LoginGuard
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
