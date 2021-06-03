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
  constructor() {

    this.pieChartOptionsArray = [];
  }

  pieLabels: string[][] = [];
  pieData: number[][] = [];
  pieTitles: string[] = [];



  breakString = (str:string, limit:number) => {
    let brokenString = '';
    for(let i = 0, count = 0; i < str.length; i++){
       if(count >= limit && str[i] === ' '){
          count = 0;
          brokenString +='\n'
       }else{
          count++;
          brokenString += str[i];
       }
    }
    return brokenString;
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
    let filteredData: number[] =[]
    let filteredLabels:string[]=[]
    for (let j=0;j<data.length;j++){
      if (data[j]!==0){
        filteredLabels.push(labels[j])
        filteredData.push(data[j])
      }
    }
    this.pieChartOptionsArray.push({
      series: filteredData,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: filteredLabels,
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
