import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeadListComponent} from "./lead-list/lead-list.component";
import {LeadDialogComponent} from "./lead-dialog/lead-dialog.component";

const routes: Routes = [
  {
    path: '',
    component: LeadListComponent
  },
  {
    path: 'new',
    component: LeadDialogComponent
  },
  {
    path: ':id/edit',
    component: LeadDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
