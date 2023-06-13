import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../pages/users/shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserModel} from "../../../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent implements OnInit {

  user: UserModel[] = [];
  userName!: string | null;
  loading: boolean = false;

  constructor(
      private authService: AuthService,
      private userService: UserService,
      private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.downloadUsers();
  }

  logout() {
    this.authService.logout();
  }

  downloadUsers() {
    this.loading = true;

    this.userService.list().then((response) => {
      this.user = response;
      this.userName = sessionStorage.getItem('user')
    })
      .catch((error) => {
        this.openSnackBar("Error list", "Close", "danger");
      })
      .finally(() => {
        this.loading = false;
      });
  }

  public openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 4000,
      panelClass: "snackBar-" + type,
    });
  }
}
