import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../models/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../shared/user.service";


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  form!: FormGroup;
  user!: UserModel;
  loading: boolean = false;
  savedChange: boolean = false;

  constructor(
      private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private userService: UserService,
      public dialog: MatDialogRef<UserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: UserDialogComponent
  ) {
    this.user = this.data.user;
  }

  ngOnInit() {
    this.initForm();
    this.populateForm(this.user);
  }

  initForm() {
    if (this.user == null) {
      this.form = this.formBuilder.group({
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [null, [Validators.required]],
        password: [null, [Validators.required]],
        status: [true],
      });
    }
    else {
      this.form = this.formBuilder.group({
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [null, [Validators.required]],
        password: [null, []],
        status: [true],
      });
    }

  }

  save(close: boolean) {
    if (this.form.valid) {

      this.loading = true;
      let user = this.form.value

      if (this.user) {
        this.userService.update(this.user.id, user).then((response) => {
          this.user = response;
          this.savedChange = true;
          this.openSnackBar('Saved successfully!', 'Close', 'success');
          if (close)
            this.closeDialog();
        }).catch(error => {
          this.openSnackBar('Error saving ' + error, 'Close', 'danger');
        }).finally(() => {
          this.loading = false;
        })
      } else {
        this.userService.create(user).then((response) => {
          this.user = response;
          this.savedChange = true;
          this.openSnackBar('Saved successfully!', 'Close', 'success');
          if (close)
            this.closeDialog();
        }).catch(error => {
          this.openSnackBar('Error saving ' + error, 'Close', 'danger');
        }).finally(() => {
          this.loading = false;
        })
      }
    }
  }

  populateForm(user: UserModel) {
    this.form.patchValue(user);
  }

  canSave(): boolean {
    return this.form.valid && !this.loading;
  }

  closeDialog(){
    if (this.savedChange) {
      this.dialog.close(this.user);
    }
    else {
      this.dialog.close();
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
