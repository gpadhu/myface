import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'myface-ac-settings',
  templateUrl: './ac-settings.component.html',
  styleUrls: ['./ac-settings.component.css']
})

export class AcSettingsComponent implements OnInit {
  public userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private acService: AccountService) {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      birthdate: ['', Validators.required]
    });
   }

  ngOnInit() {
    let user = this.acService.getCurrentUser();
    user.birthdate = this.formatDate(user.birthdate);
    this.userForm.patchValue(user);
  }

  todayDate() {
    let today = new Date();
    let date = today.toLocaleDateString().split('/').reverse().join('-');
    return date;
  }

  formatDate(birthdate) {
    return birthdate.split('.').reverse().join('-');
  }

  updateUserForm() {
    let user = this.userForm.value;
    user.birthdate = this.formatDateToDb(user.birthdate);
    this.acService.updateUser(user);
  }

  formatDateToDb(birthdate) {
    return birthdate.split('-').reverse().join('.');
  }
  

}