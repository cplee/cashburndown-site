import {Component, Output, EventEmitter } from '@angular/core';
import { AccountsService }    from './accounts.service';
import { environment } from '../../environments/environment';
import {ProgressService} from "../util/progress.service";

declare const Plaid:any;

@Component({
    selector: 'account-add',
    templateUrl: './account-add.component.html'
})
export class AccountAddComponent {
    plaid: any;
    @Output() onAccountAdded = new EventEmitter<boolean>();


  constructor(
      private accountsService: AccountsService,
      private progress: ProgressService
    ) {
      this.plaid = Plaid.create({
        env: environment.plaidEnv,
        clientName: environment.plaidClientName,
        key: environment.plaidPublicKey,
        product: 'connect',
        onSuccess: this.addAccountSuccess.bind(this)
      });
    }

    addAccount(): void {
      this.plaid.open();
    };

    addAccountSuccess(public_token, metadata): void {
      this.progress.loading = true;
      this.accountsService
        .createAccount(metadata)
        .then(() => {
          this.onAccountAdded.emit(true);
        })
        .catch(e => this.progress.alertError(e));
    };
}
