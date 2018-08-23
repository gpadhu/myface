import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'myface-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userLoggedIn: boolean = false;
  private acSubscription: Subscription;

  constructor(private acService: AccountService,
              private router: Router) {}

  ngOnInit() {
    this.userLoggedIn = this.acService.getCurrentUser() ? true : false;
    this.acSubscription = this.acService.loggedInNotifier.subscribe((userStatus)=> this.userLoggedIn = userStatus);
  }

  logOut(){
    this.acService.logOutUser();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.acSubscription.unsubscribe();
  }

}
