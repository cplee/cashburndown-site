import {Component, ViewContainerRef, NgZone} from '@angular/core';
import { AccountsService }    from './accounts.service';
import {MdSnackBar, MdSnackBarConfig, AriaLivePoliteness} from '@angular/material';
import { environment } from '../environments/environment';
import {ProgressService} from "./progress.service";

declare const Plaid:any;

@Component({
    selector: 'account-list',
    templateUrl: './account-list.component.html',
    providers: [MdSnackBar]
})
export class AccountListComponent {
    accounts: any[];
    plaid: any;

    constructor(
      private accountsService: AccountsService,
      private progress: ProgressService,
      private snackBar: MdSnackBar,
      private viewContainerRef: ViewContainerRef,
      private zone: NgZone
    ) {
      this.plaid = Plaid.create({
        env: environment.plaidEnv,
        clientName: environment.plaidClientName,
        key: environment.plaidPublicKey,
        product: 'connect',
        onSuccess: this.addAccountSuccess.bind(this)
      });
    }

    ngOnInit(): void {
      this.getAccounts();
    };

    getAccounts(): void {
      this.progress.loading = true;
      this.accountsService
        .getAccounts()
        .then(accounts => {
          this.progress.loading = false;
          this.accounts = accounts
        })
        .catch(e => {
            this.progress.loading = false;
            this.alertError(e);
            return false;
        });
    };

    addAccount(): void {
      this.plaid.open();
    };

    addAccountSuccess(public_token, metadata): void {
      this.progress.loading = true;
      this.accountsService
        .createAccount(metadata)
        .then(this.getAccounts.bind(this))
        .catch(e => {
          this.zone.run(() => {
            this.progress.loading = false;
            this.alertError(e);
          });
        });
    };

    alertError(error): void {
        let config = new MdSnackBarConfig(this.viewContainerRef);
        this.snackBar.open(error, 'OK', config);
    };

}
