import { Injectable }    from '@angular/core';
import { Account } from './account';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';

declare const AWS:any;
const apigClientFactory = require('aws-api-gateway-client')

@Injectable()
export class AccountsService {

    constructor() { }

    getAccounts(): Promise<Account[]> {
        let apigClient = apigClientFactory.newClient({
            accessKey: AWS.config.credentials.accessKeyId,
            secretKey: AWS.config.credentials.secretAccessKey,
            sessionToken: AWS.config.credentials.sessionToken,
            region: AWS.config.region,
            invokeUrl:`https://${environment.apiId}.execute-api.${AWS.config.region}.amazonaws.com/${environment.apiStage}`
        });
        return apigClient.invokeApi({}, '/accounts', 'GET').then(response => response.data);
    }
}
