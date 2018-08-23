import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'myface-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy {
  public loginForm: FormGroup;
  private acSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
   }

  submitLoginForm() {
    let user = this.loginForm.value;
    this.acSubscription = this.accountService.authenticateUser(user.email, user.password).subscribe((user)=> {
      this.router.navigate(['settings']);
    }, (error)=> {

      if (error.email) this.loginForm.controls['email'].setErrors({'exists' : true});
      if (error.password) this.loginForm.controls['password'].setErrors({'incorrect' : true});
      
    });
  }

  ngOnDestroy() {
    this.acSubscription.unsubscribe();
  }

}
