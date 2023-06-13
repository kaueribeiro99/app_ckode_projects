import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'new',
    component: UserDialogComponent
  },
  {
    path: ':id/edit',
    component: UserDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
