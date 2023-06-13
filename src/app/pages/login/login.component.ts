import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  form!: FormGroup;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private authService: AuthService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required]),
    });
  }

  login(){
    if (this.form.valid) {
      this.loading = true;

      let email = this.form.get('email')?.value
      let password = this.form.get('password')?.value

      this.authService.authenticate(email, password).then((result) => {
        if (result) {
          sessionStorage.setItem('access-token', result.access)
          sessionStorage.setItem('refresh-token', result.refresh)
          sessionStorage.setItem('user', result.user)

          this.router.navigate(['/home'])
        }
      }).catch(error => {
        this.openSnackBar('Incorrect email or password, please try again.', 'Close', 'danger')
      }).finally(() => {
        this.loading = false;
      })
    }
  }

  public openSnackBar(message: string, action: string, type: string){
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 4000,
      panelClass: 'snackBar-' + type
    });
  }

}
