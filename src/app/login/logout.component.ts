import { Component } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
})
export class LogoutComponent {
    constructor(private router: Router) {
    }

    signOut(): void {
        try {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut()
                .then(function () {
                    console.log('User signed out.');
                });
        } catch (e) {
        }

        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/']);
        //window.location.reload();
    };
}
