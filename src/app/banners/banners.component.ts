import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'myface-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent {

  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
