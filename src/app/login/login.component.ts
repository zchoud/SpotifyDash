import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import User from './../User';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {userName: "", password:"", _id:""}
  warning:string = "";
  loading: boolean = false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(loginForm: NgForm){
    const value = loginForm.value;
    if (value.userName !== '' && value.password !== '') {
      this.loading = true;
      this.auth.login(this.user).subscribe({
        next: (success) => {
          this.loading = true;
          localStorage.setItem('access_token', success.token);
          this.router.navigate(['/new-releases']);
        },
        error: (err) => {
          this.warning = err.error.message;
        }
      });
    }
  }
}
