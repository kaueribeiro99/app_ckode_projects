import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {RegisterLoginComponent} from "./pages/register-login/register-login.component";

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterLoginComponent
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'leads',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./pages/leads/leads.module').then(m => m.LeadsModule)
      },
      {
        path: 'projects',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'users',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      }
    ]
  }
];
