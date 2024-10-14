import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn!: boolean;
  user!: User | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((data: boolean) => {
      this.isLoggedIn = data;
      this.user = this.authService.getUser();
      console.log(this.user, this.isLoggedIn);
      
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
