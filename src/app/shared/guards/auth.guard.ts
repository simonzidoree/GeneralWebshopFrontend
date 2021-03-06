import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate() {
    if (this.authService.getToken()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to homepage
    this.router.navigate(['']);
    return false;
  }
}
