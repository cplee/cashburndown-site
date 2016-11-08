import { Component, NgZone } from '@angular/core';
import { Router }            from '@angular/router';
import { environment } from '../environments/environment';


import 'aws-sdk/dist/aws-sdk.min.js';
declare var AWS:any;


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    googleLoginButtonId = "google-login-button";

    constructor(
        private router: Router,
        private zone: NgZone) {

    }

    // Angular hook that allows for interaction with elements inserted by the
    // rendering of a view.
    ngAfterViewInit() {
        gapi.load('auth2', function() {
          gapi.auth2.init({
            client_id: environment.googleClientId
          });
        });

        // Converts the Google login button stub to an actual button.
        gapi.signin2.render(
            this.googleLoginButtonId,
            {
                "onsuccess": this.onGoogleLoginSuccess,
                "scope": "profile",
                "theme": "dark"
            });

    }

    // Triggered after a user successfully logs in using the Google external
    // login provider.
    onGoogleLoginSuccess = (user) => {
        this.zone.run(() => {
            var profile = user.getBasicProfile();
            var authResponse = user.getAuthResponse();

            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());

            // Add the Google access token to the Cognito credentials login map.
            AWS.config.region = environment.region;
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: environment.identityPoolId,
                Logins: {
                    'accounts.google.com': authResponse['id_token']
                }
            });

            let router = this.router;
            AWS.config.credentials.refresh(function(){
                router.navigate(['/accounts'])
            });

        });
    };
}
