import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReviewRoomService } from '../../services/review-room.service';
import { ChartTimeType } from '../../models/chartTimeType.model';
import { ChartTimeWord } from '../../models/chartTimeWord.model';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';

@Component({
  selector: 'app-review-room-trend',
  templateUrl: './review-room-trend.component.html',
  styleUrls: ['./review-room-trend.component.scss']
})
export class ReviewRoomTrendComponent {

  // 資料仍在 loading中, 顯示 loading mask
  isLoading = true;

  chartTimeType = new ChartTimeType();
  chartTimeWording = new ChartTimeWord();
  selectChartTimeWording = this.chartTimeWording.halfYear; 

  lineChart: any;
  isHiddenDialog = true;
  dialogChartTimeItemList: DialogItemModel[] = [
    {id:this.chartTimeType.week , name: this.chartTimeWording.week},
    {id:this.chartTimeType.month , name: this.chartTimeWording.month},
    {id:this.chartTimeType.season , name: this.chartTimeWording.season},
    {id:this.chartTimeType.halfYear , name: this.chartTimeWording.halfYear},
    {id:this.chartTimeType.year , name: this.chartTimeWording.year},
  ];
  
  constructor(
    private reviewRoomService: ReviewRoomService,
  ) {}

  ngOnInit(): void {
    this.selectChartTimeWording = this.chartTimeWording.halfYear;
    this.createChart(this.chartTimeType.halfYear);
  } 
  

  createChart(selectTimeModel: string){
    this.reviewRoomService
      .getChartByTimeType(selectTimeModel)
      .subscribe((res: any) => {
        this.isLoading = false;
        const chartTitle = res.timeTitle;
        const charCharSite = res.siteCount;
        const charCharRoom = res.roomCount;
        this.lineChart = new Chart("lineChart", {
            type: 'line', //this denotes tha type of chart
            data: {// values on X-Axis
              labels: chartTitle, // X 軸上的標籤
              datasets: [
                { label: this.chartTimeWording.booking_site, data: charCharSite, borderColor: '#FBE0FF',}, // Dataset 1 的資料
                { label: this.chartTimeWording.booking_room, data: charCharRoom, borderColor: '#661983',}  // Dataset 2 的資料
              ]
            },
            options: { aspectRatio:1}
        });
      },(error: any) => {
        alert(" 取得預約趨勢資料錯誤  " + error);
      });
  }


  /*
   * 確認 該日期是否在範圍內
   */
  isInTimeRange(timeInterval:string, index:number, date:Date, startdate:Date) {
    if (timeInterval === "month") {
        //該月份第一天
        const startDate = new Date(startdate.getFullYear(), (index - 1), 1); //月份減1
        //該月份最後一天
        const endDate = new Date(startdate.getFullYear(), index, 0);
        // 當前日期 在 範圍內
        return (startDate <= date) && (date <= endDate);
    }
    else if (timeInterval === "week") {
        //該週第一天
        const startDate = new Date(startdate.getFullYear(), startdate.getMonth(), index);
        //該週最後一天
        const endDate = new Date(startdate.getFullYear(), startdate.getMonth(), index + 7);
        // 當前日期 在 範圍內
        return (startDate <= date) && (date <= endDate);
    } 
    else if (timeInterval === "day") {
        const checkDate = new Date(startdate.getFullYear(), startdate.getMonth(), index);
        return (checkDate.getTime() === date.getTime());
    }
    return false;
  }
  
  selectCharTimeModel(selectTimeTypeId: string) {
    this.isLoading = true;
    this.lineChart.destroy(); // 銷毀現有圖表

    this.dialogChartTimeItemList.forEach(timeType => {
      if(timeType.id === selectTimeTypeId) {
        this.selectChartTimeWording = timeType.name;
        this.createChart(timeType.id);
      }
    });
  }

}
