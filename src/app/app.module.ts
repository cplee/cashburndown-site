import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent }         from './app.component';
import { LoginComponent }       from './login.component';
import { LogoutComponent }       from './logout.component';
import { AccountListComponent } from './account-list.component';
import { AppRoutingModule }     from './app-routing.module';
import { MaterialModule }       from '@angular/material';
import {AccountsService} from "./accounts.service";



@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        AccountListComponent,
    ],
    providers: [ AccountsService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
