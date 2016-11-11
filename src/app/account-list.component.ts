import {Component, ViewContainerRef, NgZone} from '@angular/core';
import { AccountsService }    from './accounts.service';
import {ProgressService} from "./progress.service";

@Component({
    selector: 'account-list',
    templateUrl: './account-list.component.html',
})
export class AccountListComponent {
    accounts: any[];

    constructor(
      private accountsService: AccountsService,
      private progress: ProgressService
    ) {
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
        .catch(e => this.progress.alertError(e));
    };


}
