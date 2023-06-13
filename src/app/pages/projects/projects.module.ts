import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectDialogComponent} from "./project-dialog/project-dialog.component";
import {SharedMaterialModule} from "../../shared-material-module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {CurrencyMaskModule} from "ng2-currency-mask";


@NgModule({
  declarations: [
      ProjectListComponent,
      ProjectDialogComponent
  ],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        SharedMaterialModule,
        ReactiveFormsModule,
        NgSelectModule,
        CurrencyMaskModule
    ]
})
export class ProjectsModule { }
