import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectModel} from "../../../models/project.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectService} from "../shared/project.service";
import {LeadService} from "../../leads/shared/lead.service";
import {LeadModel} from "../../../models/lead.model";


@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {

  @ViewChild('inputDate') inputDate!: ElementRef;

  form!: FormGroup;
  project!: ProjectModel;
  leads: LeadModel[] = [];

  dateNow!: string;
  loading: boolean = false;
  savedChange: boolean = false;

  constructor(
      private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private projectService: ProjectService,
      private leadService: LeadService,
      public dialog: MatDialogRef<ProjectDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ProjectDialogComponent
  ) {
    this.project = this.data.project;
    this.dateNow = this.getFormattedDate();
  }

  ngOnInit() {
    this.initForm();
    this.populateForm(this.project);
    this.downloadLeads();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      lead: [null, [Validators.required]],
      value: [null, [Validators.required]],
      deadline: [this.dateNow, [Validators.required]],
      status: [null, [Validators.required]],
      notes: [null],
    });
  }

  save(close: boolean) {
    if (this.form.valid) {

      this.loading = true;
      let project = this.form.value

      if (this.project) {
        this.projectService.update(this.project.id, project).then((response) => {
          this.project = response;
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
        this.projectService.create(project).then((response) => {
          this.project = response;
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

  populateForm(project: ProjectModel) {
    this.form.patchValue(project);
  }

  canSave(): boolean {
    return this.form.valid && !this.loading;
  }

  closeDialog(){
    if (this.savedChange) {
      this.dialog.close(this.project);
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

  downloadLeads() {
    this.loading = true;

    this.leadService.list().then((response) => {
      this.leads = response;
    })
      .catch((error) => {
        this.openSnackBar("Error list", "Close", "danger");
      })
      .finally(() => {
        this.loading = false;
      });
  }

  getFormattedDate(): string {
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`;
  }

}
