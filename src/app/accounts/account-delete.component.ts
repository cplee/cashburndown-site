import {Component, Input, Output, EventEmitter } from '@angular/core';
import { AccountsService }    from './accounts.service';
import {ProgressService} from "../util/progress.service";

@Component({
    selector: 'account-delete',
    templateUrl: './account-delete.component.html'
})
export class AccountDeleteComponent {
  @Input() id: string;
  @Output() onAccountDeleted = new EventEmitter<boolean>();


  constructor(
      private accountsService: AccountsService,
      private progress: ProgressService
    ) {
    }

    deleteAccount(): void {
      this.progress.loading = true;
      this.accountsService
        .deleteAccount(this.id)
        .then(() => this.onAccountDeleted.emit(true))
        .catch(e => this.progress.alertError(e));
    };


}
