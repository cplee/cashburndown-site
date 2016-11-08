import { Component } from '@angular/core';
import { AccountsService }    from './accounts.service';
import { environment } from '../environments/environment';

declare const Plaid:any;

@Component({
    selector: 'account-list',
    templateUrl: './account-list.component.html'
})
export class AccountListComponent {
    accounts: any[];
    plaid: any;

    constructor(private accountsService: AccountsService) {
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
      this.accountsService
        .getAccounts()
        .then(accounts => this.accounts = accounts);
    };

    addAccount(): void {
      this.plaid.open();
    };

    addAccountSuccess(public_token, metadata): void {
      console.log("add account success");
      this.accountsService
        .createAccount(metadata)
        .then(this.getAccounts.bind(this));
    }

}
