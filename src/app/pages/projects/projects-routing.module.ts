import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectDialogComponent} from "./project-dialog/project-dialog.component";

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: 'new',
    component: ProjectDialogComponent
  },
  {
    path: ':id/edit',
    component: ProjectDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
