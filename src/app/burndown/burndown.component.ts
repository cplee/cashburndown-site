import {Component} from '@angular/core';
import {ProgressService} from "../util/progress.service";
import {BurndownService} from "./burndown.service";
import {BurndownType} from "../accounts/account";
import {Burndown} from "./burndown";

@Component({
    selector: 'burndown',
    templateUrl: './burndown.component.html',
})
export class BurndownComponent {
    burndown: Burndown;
    type: BurndownType;
    asofdate: Date;
    burndownTypes: string[];
    options: Object;

    constructor(
      private progress: ProgressService,
      private burndownService: BurndownService
    ) {
      this.type = BurndownType.Paycheck;
      this.asofdate = new Date();
      this.burndownTypes = [
        BurndownType[BurndownType.Year],
        BurndownType[BurndownType.Month],
        BurndownType[BurndownType.Paycheck]
      ];
    }

    ngOnInit(): void {
      this.getBurndown();
    };

    getBurndown(): void {
        this.progress.loading = true;
        this.burndownService
          .getBurndown(this.type, this.asofdate)
          .then(burndown => {
            this.burndown = burndown;
            this.updateChart();
            this.progress.loading = false;
          })
          .catch(e => this.progress.alertError(e));
    };

    updateChart(): void {
        this.options = {
          title : { text : null },
          series: [{
            type: 'line',
            name: 'Actual',
            data: this.getActualBalances()
          }]
        };
    }

    previousBurndown(): void {
      this.asofdate = new Date(this.burndown.startDate);
      this.asofdate.setDate(this.asofdate.getDate()-1);
      this.getBurndown();
    };

    nextBurndown(): void {
      this.asofdate = new Date(this.burndown.endDate);
      this.asofdate.setDate(this.asofdate.getDate()+1);
      this.getBurndown();
    };

    getActualBalances(): number[] {
      let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      let daysInBurndown = 1 + Math.round(Math.abs((new Date(this.burndown.endDate).getTime() - new Date(this.burndown.startDate).getTime())/(oneDay)));
      let initialBalances = Array(daysInBurndown).fill(0);

      initialBalances[0] = this.burndown.startBalance;

      return this.burndown.actualTx.reduce((balances, tx) => {
        let dayNumber = Math.round(Math.abs((new Date(tx.date).getTime() - new Date(this.burndown.startDate).getTime())/(oneDay)));

        return balances.map((val,index) => {
          if(index >= dayNumber) {
            return val - tx.amount
          } else {
            return val;
          }
        });
      },initialBalances);
    }

}
