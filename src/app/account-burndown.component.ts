import {Component, Input } from '@angular/core';
import { AccountsService }    from './accounts.service';
import {ProgressService} from "./progress.service";
import {BurndownType} from "./account";

@Component({
    selector: 'account-burndown',
    templateUrl: './account-burndown.component.html'
})
export class AccountBurndownComponent {
  @Input() id: string;
  @Input() burndown: BurndownType;
  burndownTypes:string[];

  constructor(
      private accountsService: AccountsService,
      private progress: ProgressService
    ) {
      this.burndownTypes = [
        BurndownType[BurndownType.Year],
        BurndownType[BurndownType.Month],
        BurndownType[BurndownType.Paycheck]
      ];
    }

    updateAccount(): void {
      this.progress.loading = true;
      console.log(this.id + '<->' + this.burndown);
      /*
      this.accountsService
        .setAccountBurndown(this.id, this.burndown)
        .catch(e => this.progress.alertError(e));
        */
    };


}
