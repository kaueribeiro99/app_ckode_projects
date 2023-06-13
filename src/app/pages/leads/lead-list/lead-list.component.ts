import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {LeadDialogComponent} from "../lead-dialog/lead-dialog.component";
import {DialogService} from "../../../components/confirm-dialog/confirm-dialog.service";
import {LeadService} from "../shared/lead.service";
import {MatTableDataSource} from "@angular/material/table";
import {LeadModel} from "../../../models/lead.model";


@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css']
})
export class LeadListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading: boolean = false;

  displayedColumns: string[] = ["id", "name", "company", "email", "phone_number", "options"];
  dataSource: MatTableDataSource<LeadModel> = new MatTableDataSource();

  constructor(
      private elementRef: ElementRef,
      private _liveAnnouncer: LiveAnnouncer,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog,
      private confirmService: DialogService,
      private leadService: LeadService
  ) { }

  ngOnInit() {
    this.downloadLeads();
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

  openDialog(lead?: LeadModel) {
    let dialogRef = this.dialog.open(LeadDialogComponent, {
      width: '800px',
      panelClass: 'dialog',
      autoFocus: true,
      data: { lead: lead }
    });

    dialogRef.afterClosed().subscribe((lead: LeadModel) => {
      if (lead) {
        this.downloadLeads();
      }
    });
  }

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––– DOWNLOADS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  downloadLeads() {
    this.loading = true;

    this.leadService.list().then((response) => {
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
    this.confirmService.openConfirmDialog('Delete', 'Are you sure you want to delete the lead ' + name + ' ?', 'Cancel', 'Delete')
        .afterClosed().subscribe(result_dialog => {
      if(result_dialog) {
        this.loading = true;
        this.leadService.delete(id).then((response) => {
          if (response.error) {
            this.openSnackBar('Error: Lead with assigned projects.', 'Close', 'danger');
          }
          else {
            this.downloadLeads();
            this.openSnackBar('Deleted successfully!', 'Close', 'success');
          }
        }).catch(error => {
          this.openSnackBar('Error deleting lead ' + error, 'Close', 'danger');
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
