import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'myface-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  public notificationMessage: string;
  private acSubscription: Subscription;

  constructor(private acService: AccountService) { }

  ngOnInit() {

    this.acSubscription = this.acService.notificationSender.subscribe((message)=> {
      this.notificationMessage = message;

      setTimeout(()=> {
        this.notificationMessage = null;
      }, 3000);

    });
  }

  ngOnDestroy() {
    this.acSubscription.unsubscribe();
  }


}
