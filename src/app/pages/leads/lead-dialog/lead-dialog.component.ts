import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeadModel} from "../../../models/lead.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LeadService} from "../shared/lead.service";

@Component({
  selector: 'app-lead-dialog',
  templateUrl: './lead-dialog.component.html',
  styleUrls: ['./lead-dialog.component.css']
})
export class LeadDialogComponent implements OnInit {

  form!: FormGroup;
  lead!: LeadModel;
  loading: boolean = false;
  savedChange: boolean = false;

  constructor(
      private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private leadService: LeadService,
      public dialog: MatDialogRef<LeadDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: LeadDialogComponent
  ) {
    this.lead = this.data.lead;
  }

  ngOnInit() {
    this.initForm();
    this.populateForm(this.lead);
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      company: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone_number: [null, [Validators.required]],
      notes: [null],
    });
  }

  save(close: boolean) {
    if (this.form.valid) {

      this.loading = true;
      let lead = this.form.value

      if (this.lead) {
        this.leadService.update(this.lead.id, lead).then((response) => {
          this.lead = response;
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
        this.leadService.create(lead).then((response) => {
          this.lead = response;
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

  populateForm(lead: LeadModel) {
    this.form.patchValue(lead);
  }

  canSave(): boolean {
    return this.form.valid && !this.loading;
  }

  closeDialog(){
    if (this.savedChange) {
      this.dialog.close(this.lead);
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
