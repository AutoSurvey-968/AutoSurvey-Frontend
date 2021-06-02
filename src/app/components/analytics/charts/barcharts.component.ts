import { ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions
} from "ng-apexcharts";
import { IReport } from "src/app/models/ireport-report";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
};


@Component({
  selector: 'app-barcharts',
  templateUrl: './barcharts.component.html',
  styleUrls: ['./barcharts.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class BarChartsComponent{
  @Input()
  get nestedReport(): IReport|undefined{return this.nestedReport}
  set nestedReport(nestedReport: IReport|undefined){
    this._nestedReport=nestedReport;
    this.setChartValues(nestedReport);
    
  }
  private _nestedReport?: IReport;

  dataBars?: ChartOptions["series"];
  barsHeight?: ChartOptions["chart"];


  public barChartOptions?: Partial<ChartOptions>;
  public pieChartOptions?: Partial<ChartOptions>[];

  constructor() {  }
 
  
  breakString = (str:string, limit:number) => {
    let brokenString = '';
    let stringArray:string[]=[]
    for(let i = 0, count = 0; i < str.length; i++){
       if(count >= limit && str[i] === ' '){
          count = 0;
          stringArray.push(brokenString);
          brokenString ='';
       }else{
          count++;
          brokenString += str[i];
       }
    }
    return stringArray;
 }
  setChartValues(nestedReport: IReport | undefined): void{
    if (nestedReport!==undefined){
      if (nestedReport.averages!==undefined){
        let tempdata:{ x: any; y: any; fillColor?: string | undefined}[]=[]
        //it seems a little silly to calculate height this way, but it avoids going through the map more than once
        let height=350;

        Object.entries(nestedReport.averages).forEach(([key,value])=>{
          let color='';
          if(value.delta===undefined){
            color="#008FFB";//blue
          }else if(value.delta>value.datum){
            color="#FF2020";//red
          }else if(value.delta<value.datum){
            color="#00E3c5";//green
          }else{
            color="##FEB019";//yellow
          }
          tempdata.push({x: this.breakString(key,20), y:[((value.delta===undefined ||value.delta===value.datum)? 0: value.delta),value.datum],fillColor:color});

          //fast dynamic height generation
          // if((value.delta===undefined? 0: value.datum-value.delta)>height){
          //   height=(value.delta===undefined? 0: value.datum-value.delta);
          // }if (value.datum>height){
          //   height=value.datum;
          // }
        });
        let testData=tempdata
        this.dataBars=[{name:'Averages of this Week versus Previous', data:testData}];
        this.barsHeight={type: "rangeBar", height:(Math.round(1.5*height))}
      }
    }
    this.barChartOptions = {
      series: this.dataBars,
      chart: this.barsHeight,
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      dataLabels: {
        enabled: true
      }
    };
  }



  
}



