import { Component } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isLoggedin: boolean;
  isAdmin: boolean;

  

  constructor( private apiService: ApiService,
    private router: Router) {
      this.isLoggedin = this.apiService.isLoggedIn();
      this.isAdmin = this.apiService.isAdmin();

      this.apiService.loginStatus.subscribe(
        (status)=>{this.isLoggedin = status});
        this.isAdmin = this.apiService.isAdmin();
     }

    

  logout() {
    this.apiService.logout();
    this.router.navigate(['/']);
    
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
