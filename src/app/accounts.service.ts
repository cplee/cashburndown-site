import { Injectable }    from '@angular/core';
import {Account, BurndownType} from './account';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';

declare const AWS:any;
const apigClientFactory = require('aws-api-gateway-client')

@Injectable()
export class AccountsService {
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

    getAccounts(): Promise<Account[]> {
      return this.apigClient.invokeApi({}, '/accounts', 'GET').then(response => response.data);
    };

    createAccount(token: any): Promise<any> {
      return this.apigClient.invokeApi({}, '/tokens', 'POST', {}, token);
    };

    setAccountBurndown(id: string, burndown: BurndownType): Promise<any> {
        return this.apigClient.invokeApi({id:id}, '/accounts/{id}/burndown', 'PUT', {}, burndown);
    };

    deleteAccount(id: string): Promise<any> {
      return this.apigClient.invokeApi({id:id}, '/accounts/{id}', 'DELETE');
    };
}
