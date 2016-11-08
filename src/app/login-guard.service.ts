import 'aws-sdk/dist/aws-sdk.min.js';
declare var AWS:any;

import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    if(AWS.config.credentials == undefined) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}

