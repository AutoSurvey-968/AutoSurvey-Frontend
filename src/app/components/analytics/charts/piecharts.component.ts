import { Component, Input} from "@angular/core";
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { IReport } from "src/app/models/ireport-report";

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
  styleUrls: ['./piecharts.component.css']
})


export class PiechartsComponent{
  @Input()
  get nestedReport(): IReport|undefined{return this.nestedReport}
  set nestedReport(nestedReport: IReport|undefined){
    this._nestedReport=nestedReport;
    this.setChartValues(nestedReport);
    for(let i=0;i<this.pieData.length;i++){
      this.chartMaker(this.pieData[i],this.pieLabels[i],this.pieTitles[i])
    }
  }
  private _nestedReport?: IReport;


  public pieChartOptionsArray: Partial<ChartOptions>[]=[];
  data1=[44, 55, 13, 43, 22]
  data2=[7,99,150]
  labels1=["Team A", "Team B", "Team C", "Team D", "Team E"]
  labels2=["Team 1", "Team 2", "Team 3"]
  constructor() {}

  pieLabels:string[][]=[];
  pieData:number[][]=[];
  pieTitles:string[]=[];



  changeData():void{
    this.chartMaker(this.data1,this.labels1,"test1")
    this.chartMaker(this.data2,this.labels2,"title2")
  }

  setChartValues(nestedReport: IReport | undefined): void{
    if (nestedReport!==undefined){
      if(nestedReport.percentages!=undefined){
        let tempTitles:string[]=[];
        let tempData:number[][]=[];
        let tempLabels:string[][]=[];
        nestedReport.percentages.forEach((value,key)=>{
          tempTitles.push(key);
          let tempTempData:number[]=[];
          let tempTempLabels:string[]=[];
          value.forEach((subValue,subKey)=>{
            tempTempLabels.push(subKey);
            tempTempData.push(subValue.datum);
          })
          tempData.push(tempTempData);
          tempLabels.push(tempTempLabels);
        })
        this.pieData=tempData;
        this.pieLabels=tempLabels;
        this.pieTitles=tempTitles;
      }
    }
  }
  chartMaker(data:number[],labels:string[], title:string): void{
    
    this.pieChartOptionsArray.push( {
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
