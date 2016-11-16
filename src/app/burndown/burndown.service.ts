import { Injectable }    from '@angular/core';
import {BurndownType} from '../accounts/account';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import {Burndown} from "./burndown"

declare const AWS:any;
const apigClientFactory = require('aws-api-gateway-client')

@Injectable()
export class BurndownService {
    apigClient: any;

    constructor() {
      this.apigClient = apigClientFactory.newClient({
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken,
        region: AWS.config.region,
        invokeUrl:`https://${environment.apiId}.execute-api.${AWS.config.region}.amazonaws.com/${environment.apiStage}`
      });
    }

    getBurndown(burndownType: BurndownType, asofdate: Date): Promise<Burndown> {
      return this.apigClient.invokeApi({burndownType:BurndownType[burndownType]}, '/burndowns/{burndownType}', 'GET', {
        queryParams: { asofdate: asofdate.toISOString() }
      }).then(response => response.data);
    };
}
