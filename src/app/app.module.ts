
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from './shared-material-module';

import { SharedModule } from './shared-menu-items/shared.module';
import { SpinnerComponent } from './shared-menu-items/spinner.component';
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { LoginComponent } from './pages/login/login.component';
import { RegisterLoginComponent } from './pages/register-login/register-login.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    ConfirmDialogComponent,
    LoginComponent,
    RegisterLoginComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedMaterialModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(AppRoutes),
        DragDropModule,
        ReactiveFormsModule
    ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
