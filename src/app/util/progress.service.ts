import {Injectable, ViewContainerRef, NgZone, ErrorHandler}    from '@angular/core';
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";

@Injectable()
export class ProgressService implements ErrorHandler {

  loading = false;
  viewContainerRef:ViewContainerRef;

  constructor(private snackBar:MdSnackBar,
              private zone:NgZone) {
  };

  handleError(error) {
    this.alertError(error);
  }

  alertError(error):void {
    console.log(error.stack);
    this.loading = false;
    this.zone.run(() => {
      let config = new MdSnackBarConfig(this.viewContainerRef);
      this.snackBar.open(error, 'OK', config);
    });
  };
}
