import { Component } from '@angular/core';
import { AccountsService }    from './accounts.service';

@Component({
    selector: 'account-list',
    templateUrl: './account-list.component.html'
})
export class AccountListComponent {
    accounts: any[];

    constructor(private accountsService: AccountsService) {
    }

    ngOnInit(): void {
      this.accountsService
        .getAccounts()
        .then(accounts => this.accounts = accounts);
    }

}
