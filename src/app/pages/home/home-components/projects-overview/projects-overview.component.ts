import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid
} from "ng-apexcharts";
import {ProjectsStatusService} from "./shared/projects-status.service";

export interface StatusChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  colors: string[];
}

@Component({
  selector: "app-projects-overview",
  templateUrl: "./projects-overview.component.html"
})
export class ProjectsOverviewComponent implements OnInit {

  quantity: any[] = [];
  statusName: any[] = [];

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public statusChartOptions!: Partial<StatusChartOptions>;

  constructor(
      private homeService: ProjectsStatusService
  ) {}

  ngOnInit() {
    this.downloadProjectsStatus();
    this.statusChartOptions = this.chartBarStatus();
  }

  downloadProjectsStatus() {
    this.homeService.list().then((response) => {
      response.forEach((project: any) => {
        this.quantity.push(project.quantity)
        this.statusName.push(project.status_name)
      });
    });
  }

  chartBarStatus(): Partial<StatusChartOptions> {
    return (this.statusChartOptions = {
      series: [
        {
          name: this.statusName.toString(),
          data: this.quantity,
        },
      ],
      chart: {
        height: 320,
        type: "bar",
        fontFamily: "Poppins,sans-serif",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        borderColor: "rgba(0,0,0,.2)",
        strokeDashArray: 4,
      },
      xaxis: {
        categories: this.statusName,
        labels: {
          style: {
            colors: ["#1A8754", "#1E88E5", "#363636", "#DC3545"],
            fontSize: "12px"
          }
        }
      },
      fill: {
        colors: ["#1A8754", "#1E88E5", "#363636", "#DC3545"],
        opacity: 1,
      },
      tooltip: {
        theme: "dark",
      },
    });
  }

}
