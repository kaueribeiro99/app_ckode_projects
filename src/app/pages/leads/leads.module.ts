import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import {LeadListComponent} from "./lead-list/lead-list.component";
import {LeadDialogComponent} from "./lead-dialog/lead-dialog.component";
import {SharedMaterialModule} from "../../shared-material-module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
      LeadListComponent,
      LeadDialogComponent
  ],
    imports: [
        CommonModule,
        LeadsRoutingModule,
        SharedMaterialModule,
        ReactiveFormsModule,
    ]
})
export class LeadsModule { }
