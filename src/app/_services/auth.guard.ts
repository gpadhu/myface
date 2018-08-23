import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private acService: AccountService,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      if (this.loginPage(state) && this.acService.getCurrentUser()) {
        this.router.navigate(['/settings']);
        this.acService.notificationSender.next('You are already signed!');
      }

      if (this.loginPage(state) || this.acService.getCurrentUser()) return true; 

      this.router.navigate(['/']);
      this.acService.notificationSender.next('You are not authorized to access this page, Please login to access.');
  }

  loginPage(state) {
    return state.url === '/login';
  }
}
