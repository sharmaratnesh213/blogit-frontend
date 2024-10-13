import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage!: string;

  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if(this.loginForm.valid){
      const {email, password} = this.loginForm.value;

      this.authService.login({email: email, password}).subscribe({
        next: (response) => {
          const {jwtToken, user} = response;

          if(jwtToken){
            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Login failed. No token received.';
          }
        },
        error: (error) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      });
    }
  }

}
