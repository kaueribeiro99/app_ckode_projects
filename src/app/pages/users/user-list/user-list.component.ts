import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UserModel} from "../../../models/user.model";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../components/confirm-dialog/confirm-dialog.service";
import {UserService} from "../shared/user.service";
import {UserDialogComponent} from "../user-dialog/user-dialog.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading: boolean = false;

  displayedColumns: string[] = ["id", "name", "email", "last_login", "status", "options"];
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource();

  constructor(
      private elementRef: ElementRef,
      private _liveAnnouncer: LiveAnnouncer,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog,
      private confirmService: DialogService,
      private userService: UserService
  ) { }

  ngOnInit() {
    this.downloadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––– SEARCH AND SORT ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––– OPEN DIALOG ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  openDialog(user?: UserModel) {
    let dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      panelClass: 'dialog',
      autoFocus: true,
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe((user: UserModel) => {
      if (user) {
        this.downloadUsers();
      }
    });
  }

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––– DOWNLOADS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  downloadUsers() {
    this.loading = true;

    this.userService.list().then((response) => {
      this.dataSource.data = response;
    })
      .catch((error) => {
        this.openSnackBar("Error list", "Close", "danger");
      })
      .finally(() => {
        this.loading = false;
      });
  }

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––– DELETE RESOURCE ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  delete(id: number, name: string) {
    this.confirmService.openConfirmDialog('Delete', 'Are you sure you want to delete the user ' + name + ' ?', 'Cancel', 'Delete')
        .afterClosed().subscribe(result_dialog => {
      if(result_dialog) {
        this.loading = true;
        this.userService.delete(id).then(() => {
          this.downloadUsers();
          this.openSnackBar('Deleted successfully!', 'Close', 'success');

        }).catch(error => {
          this.openSnackBar('Error deleting user ' + error, 'Close', 'danger');
        }).finally(()=> {
          this.loading = false;
        })
      }
    });
  }

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––– SNACK BAR ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  public openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 4000,
      panelClass: "snackBar-" + type,
    });
  }

}
