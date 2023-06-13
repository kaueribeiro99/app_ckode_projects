import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../users/shared/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  form!: FormGroup;
  user!: UserModel;
  loading: boolean = false;

  constructor(
      public router: Router,
      private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private userService: UserService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      status: [true],
    });
  }

  async create() {
    if (this.form.valid) {

      this.loading = true;
      let user = this.form.value

      this.userService.register(user).then((response) => {
        this.user = response;
        this.router.navigate(['/login'])
        this.openSnackBar('User created successfully!', 'Close', 'success');
      }).catch(error => {
        this.openSnackBar('Error created user ' + error, 'Close', 'danger');
      }).finally(() => {
        this.loading = false;
      })
    }
  }

  public openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 4000,
      panelClass: 'snackBar-' + type
    });
  }

}
