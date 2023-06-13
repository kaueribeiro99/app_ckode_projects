import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {UserListComponent} from "./user-list/user-list.component";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";
import {SharedMaterialModule} from "../../shared-material-module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
      UserListComponent,
      UserDialogComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedMaterialModule,
        ReactiveFormsModule
    ]
})
export class UsersModule { }
