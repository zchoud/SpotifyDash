import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import RegisterUser from '../RegisterUser';
import { AuthService } from '../auth.service';
import {Router} from "@angular/router"
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = {userName: "", password: "", password2: ""};
  warning: string = "";
  success: boolean = false;
  loading: boolean = false;
  
  constructor(private auth: AuthService, public dialog: MatDialog, private router: Router) { 
    this.registerUser = new RegisterUser();
  }

  ngOnInit(): void {
  }

  validPass(pass:string){
    if(pass.length < 8){
      this.warning = "Password must be at least 8 characters and numbers"
    }
    else if(!this.checkPass(pass)){
      if(!pass.match('^(?=.*?[A-Z])[a-zA-Z0-9!@#$%^&*]*$'))
        this.warning  = "Need at least 1 capital letter";
      else if(!pass.match('(?=.*?[a-z])[a-zA-Z0-9!@#$%^&*]*$'))
        this.warning  = "Need at least 1 lowercase letter";
      else if(!pass.match('(?=.*?[0-9])[a-zA-Z0-9!@#$%^&*]*$'))
        this.warning  = "Need at least 1 number";
    }
    else{
      this.warning  = "";
    }
  }

  checkPass(pass:string):any{
    return pass.length >= 8 && pass.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9!@#$%^&*]*$');
  }

  openDialog() {
    this.dialog.open(DialogRegister);
  }

  onSubmit(registerForm: NgForm){
      let value = registerForm.value;
      if (value.userName === '') {
        this.warning = 'Enter User Name';
        this.success = false;
        this.loading = false;
      } else if (value.password !== value.password2) {
        this.warning = 'Passwords do not match';
        this.success = false;
        this.loading = false;
      }
      else if(!this.checkPass(value.password)){
        this.warning = "Invalid password";
        this.success = false;
        this.loading = false;
      }
      else{
        this.loading = true;
        this.auth.register(this.registerUser).subscribe({
          next: (res) => {
            this.success = true;
            this.warning = "";
            this.loading = false;
            registerForm.reset();
            this.openDialog();
          },
          error: (err) => {
            this.warning = err.error.message;
            this.success = false;
            this.loading = false;
          }
          }
        );
      }
    }
}

@Component({
  selector: 'dialog-register',
  templateUrl: './registerDialog.component.html',
})
export class DialogRegister {
  constructor(private router:Router, 
    public dialogRef: MatDialogRef<DialogRegister>,
  ) {}

  routeLogin(){
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}