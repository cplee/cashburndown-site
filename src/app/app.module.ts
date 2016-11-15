import { NgModule, ErrorHandler }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent }         from './app.component';
import { LoginComponent }       from './login.component';
import { LogoutComponent }       from './logout.component';
import { AccountListComponent } from './account-list.component';
import { AccountAddComponent } from './account-add.component';
import { AccountDeleteComponent } from './account-delete.component';
import { AccountBurndownComponent } from './account-burndown.component';
import { AppRoutingModule }     from './app-routing.module';
import { MaterialModule }       from '@angular/material';
import { AccountsService } from "./accounts.service";
import { LoginGuard } from "./login-guard.service";
import {ProgressService} from "./progress.service";
import {ProgressComponent} from "./progress.component";
import {FormsModule} from '@angular/forms';



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
