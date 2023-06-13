import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../shared-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home.component';
import { DashboardRoutes } from './home-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProjectsOverviewComponent } from './home-components/projects-overview/projects-overview.component';
import { ProjectsPercentageComponent } from './home-components/projects-percentage/projects-percentage.component';


@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    FlexLayoutModule,
    NgApexchartsModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [HomeComponent, ProjectsOverviewComponent, ProjectsPercentageComponent]
})
export class HomeModule {}
