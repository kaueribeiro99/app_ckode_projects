import { Component, ViewChild } from "@angular/core";
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";
import {ProjectsPercentageService} from "./shared/projects-percentage.service";


export interface PercentageChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  stroke: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
}

@Component({
  selector: "app-projects-percentage",
  templateUrl: "./projects-percentage.component.html"
})
export class ProjectsPercentageComponent {

  percentage: number[] = [];
  statusName: any[] = [];

  @ViewChild("piechart") chart2: ChartComponent = Object.create(null);
  public percentageChart!: Partial<PercentageChartOptions>;

  constructor(
      private homeService: ProjectsPercentageService
  ) {}

  ngOnInit() {
    this.downloadProjectsPercentage();
    this.percentageChart = this.chartPieStatusPercentage();
  }

  downloadProjectsPercentage() {
    this.homeService.list().then((response) => {
      response.forEach((project: any) => {
        this.percentage.push(project.percentage);
        this.statusName.push(project.status_name)
      });
    });
  }

  chartPieStatusPercentage(): Partial<PercentageChartOptions> {
    return {
      series: this.percentage,
      chart: {
        type: "donut",
        fontFamily: "Poppins,sans-serif",
        height: 248,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75px",
          },
        },
      },
      tooltip: {
        fillSeriesColor: true,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels: this.statusName,
      colors: ["#1A8754", "#1E88E5", "#363636"],
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    };
  }

}
