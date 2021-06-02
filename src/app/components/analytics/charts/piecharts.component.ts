import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { IReport, reportData } from "src/app/models/ireport-report";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle
};

@Component({
  selector: 'app-piecharts',
  templateUrl: './piecharts.component.html',
  styleUrls: ['./piecharts.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})


export class PiechartsComponent {
  @Input()
  get nestedReport(): IReport | undefined { return this.nestedReport }
  set nestedReport(nestedReport: IReport | undefined) {
    this._nestedReport = nestedReport;
    this.setChartValues(nestedReport);

  }
  private _nestedReport?: IReport;


  public pieChartOptionsArray: Partial<ChartOptions>[] = [];
  data1 = [44, 55, 13, 43, 22]
  data2 = [7, 99, 150]
  labels1 = ["Team A", "Team B", "Team C", "Team D", "Team E"]
  labels2 = ["Team 1", "Team 2", "Team 3"]
  constructor() {

    this.pieChartOptionsArray = [];
  }

  pieLabels: string[][] = [];
  pieData: number[][] = [];
  pieTitles: string[] = [];



  changeData(): void {
    this.pieChartOptionsArray = []
    this.chartMaker(this.data1, this.labels1, "test1")
    this.chartMaker(this.data2, this.labels2, "title2")
    for (let i = 0; i < 8; i++) {
      this.chartMaker([1, 99], ["my knowledge", "my sheer force of will"], `for loop chart:${i}`)
    }
  }

  setChartValues(nestedReport: IReport | undefined): void {
    if (nestedReport !== undefined) {
      if (nestedReport.percentages != undefined) {
        let tempTitles: string[] = [];
        let tempData: number[][] = [];
        let tempLabels: string[][] = [];
        Object.keys(nestedReport.percentages).forEach((key: string) => {
          tempTitles.push(key);
        });


        
        Object.values(nestedReport.percentages).forEach((value: Map<string, reportData>) => {
          let tempTempData: number[] = [];
          let tempTempLabels: string[] = [];
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            tempTempData.push(nestedValue.datum)
            tempTempLabels.push(nestedKey)
          })
          tempLabels.push(tempTempLabels)
          tempData.push(tempTempData)
        })
        this.pieTitles = tempTitles;
        this.pieData = tempData;
        this.pieLabels = tempLabels;
      }
    }
    this.pieChartOptionsArray = [];
    for (let i = 0; i < this.pieData.length; i++) {
      this.chartMaker(this.pieData[i], this.pieLabels[i], this.pieTitles[i])
    }
  }
  chartMaker(data: number[], labels: string[], title: string): void {
    if (data.filter((n)=>n!==0).length===0){
      return;
    }
    this.pieChartOptionsArray.push({
      series: data,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: labels,
      title: {
        text: title
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    });
  }

}
