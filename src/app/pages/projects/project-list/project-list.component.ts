import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ProjectModel} from "../../../models/project.model";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../components/confirm-dialog/confirm-dialog.service";
import {ProjectService} from "../shared/project.service";
import {ProjectDialogComponent} from "../project-dialog/project-dialog.component";
import {STATUS_PROJECTS} from "../../../constants";


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading: boolean = false;
  statusProjects = STATUS_PROJECTS;

  displayedColumns: string[] = ["color", "created_at", "id", "name", "lead", "value", "deadline", "status", "options"];
  dataSource: MatTableDataSource<ProjectModel> = new MatTableDataSource();

  constructor(
      private elementRef: ElementRef,
      private _liveAnnouncer: LiveAnnouncer,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog,
      private confirmService: DialogService,
      private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.downloadProjects();
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

  openDialog(project?: ProjectModel) {
    let dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '900px',
      panelClass: 'dialog',
      autoFocus: true,
      data: { project: project }
    });

    dialogRef.afterClosed().subscribe((project: ProjectModel) => {
      if (project) {
        this.downloadProjects();
      }
    });
  }

  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––– DOWNLOADS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  downloadProjects() {
    this.loading = true;

    this.projectService.list().then((response) => {
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
    this.confirmService.openConfirmDialog('Delete', 'Are you sure you want to delete the project ' + name + ' ?', 'Cancel', 'Delete')
        .afterClosed().subscribe(result_dialog => {
      if(result_dialog) {
        this.loading = true;
        this.projectService.delete(id).then(() => {
          this.downloadProjects();
          this.openSnackBar('Deleted successfully!', 'Close', 'success');

        }).catch(error => {
          this.openSnackBar('Error deleting project ' + error, 'Close', 'danger');
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
