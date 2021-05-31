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
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BarChartsComponent{
  @Input()
  get nestedReport(): IReport|undefined{return this.nestedReport}
  set nestedReport(nestedReport: IReport|undefined){
    this._nestedReport=nestedReport;
    this.setChartValues(nestedReport);
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
  private _nestedReport?: IReport;

  dataBars?: ChartOptions["series"];
  barsHeight?: ChartOptions["chart"];


  public barChartOptions?: Partial<ChartOptions>;
  public pieChartOptions?: Partial<ChartOptions>[];

  constructor() {
    

  }
  data1: ChartOptions["series"]=[
    {
      name: "blue",
      data: [
        {
          x: "Team A",
          y: [1, 5]
        },
        {
          x: "Team B",
          y: [4, 6]
        },
        {
          x: "Team C",
          y: [5, 8]
        },
        {
          x: "Team D",
          y: [3, 11]
        }
      ]
    }
  ]
  changeData():void{
    
    this.barChartOptions = {
      series: this.data1,
      chart: {
        type: "rangeBar",
        height: 350
      },
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

  setChartValues(nestedReport: IReport | undefined): void{
    if (nestedReport!==undefined){
      if (nestedReport.averages!==undefined){
        let tempdata =[]
        //it seems a little silly to calculate height this way, but it avoids going through the map more than once
        let height=1;
        nestedReport.averages.forEach((value,key)=>{
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
          tempdata.push({x: key, y:[((value.delta===undefined ||value.delta===value.datum)? 0: value.datum-value.delta),value.datum],fillColor:color});

          //fast dynamic height generation
          if((value.delta===undefined? 0: value.datum-value.delta)>height){
            height=(value.delta===undefined? 0: value.datum-value.delta);
          }if (value.datum>height){
            height=value.datum;
          }
        });
        this.dataBars=[{name:'Averages of this Week versus Previous', data:[]}];
        this.barsHeight={type: "rangeBar", height:(Math.round(1.5*height))}
      }

      if(nestedReport.percentages!=undefined){

      }
    }
    
  }



  
}



