import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../_interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUser: User;
  public loggedInNotifier = new Subject<boolean>();
  public notificationSender = new Subject<string>();

  constructor(private http: HttpClient) {}

  authenticateUser(email: string, password: string) {
    return new Observable((obs)=> {
      this.http.get('/assets/data/users.json').subscribe((users: User[])=> {
      
        let user = users.filter((user)=> user.email == email)[0];

        if(user == undefined) {
          obs.error({email : 'Provided email address does not exists'});
        } else {

          if(user.password == password) {
            obs.next(user);
            this.saveAndNotifyLoggedinUser(user);
          } else {
            obs.error({password: 'Invalid password'});
          }  
        }
      });
    });
  }

  getCurrentUser() {
    return this.currentUser || JSON.parse(localStorage.getItem('currentUser'));
  }

  updateUser(user) {
    this.currentUser = user;
    localStorage.setItem( 'currentUser', JSON.stringify(user));
    this.notificationSender.next(`Hi ${user.firstname}, your account details has been successfully updated.`);
  }

  logOutUser() {
    this.currentUser = null;
    localStorage.clear();
    this.loggedInNotifier.next(false);
    this.notificationSender.next(`Successfully logged out. Thank you for using myface!`)
  }

  isUserLoggedin?(){
    return this.currentUser ? true : false
  }

  saveAndNotifyLoggedinUser(user) {
    this.currentUser = user;
    localStorage.setItem( 'currentUser', JSON.stringify(user));

    this.loggedInNotifier.next(true);
    this.notificationSender.next(`Welcome ${user.firstname}, You have successfully loggedin!`);
  }
}
