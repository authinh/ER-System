import { BsModalService } from 'ngx-bootstrap/modal';
import { DashboardService } from './../../../service/dashboard.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  
  rows = [];

  constructor(private modalService: BsModalService, private dashboardService: DashboardService) {
  
  }

  public orderTotal: number;
  public incomeTotal: number;

  public lineChartData: Array<any> = [
    { data: [20, 2, 20, 23, 34, 23, 10, 20, 23, 34, 23, 10], label: 'Số lượng đơn hàng', yAxisID: "y-axis-so-luong" },
    { data: [2000000, 2000000, 2300000, 1200000, 3400000, 2300000, 100000,20, 23, 34, 23, 10], label: 'Doanh thu đơn hàng (VND)', fill: false, yAxisID: "y-axis-doanh-thu" },
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        id: "y-axis-so-luong"
      }, {
        id: "y-axis-doanh-thu"
      }]
    }
  };
  public lineChartColors: Array<any> = [

  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // bieu do 2
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels: string[] = ['mon 1', 'mon 2', 'mon 3', 'mon 4', 'mon 5'];
  public barChartType: string = 'horizontalBar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 30, 20, 10, 3], label: 'Số lượng đặt' }
  ];

  public barChartColors: any[] = [
    {
      backgroundColor: [
        'rgba(65,105,225 ,1)',
        'rgba(65,105,225 ,0.8)',
        'rgba(65,105,225 ,0.6)',
        'rgba(65,105,225 ,0.4)',
        'rgba(65,105,225 ,0.2)',
      ]
    }
  ];

  //bieu do 3
  // public barChartOptions2:any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true,
  // };
  // public barChartLabels2:string[] = ['1h-4h', '4h-8h', '8h-12h', '12h-16h', '16h-20h','20h-24h'];
  // public barChartType2:string = 'radar';
  // public barChartLegend2:boolean = true;

  // public barChartData2:any[] = [
  //   {data: [65, 59, 30, 20, 10,3,5], label: 'Số lượng đặt'}
  // ];

  // public barChartColors2:any[] =[
  //   { // grey
  //     backgroundColor: [
  //       'rgba(255, 185, 15,1)',
  //       'rgba(255, 185, 15,0.8)',
  //       'rgba(255, 185, 15,0.6)',
  //       'rgba(255, 185, 15,0.4)',
  //       'rgba(255, 185, 15,0.2)',
  //     ]
  //   }
  // ];
  // Doughnut
  // PolarArea
  public polarAreaChartLabels: string[] = ['1h-4h', '4h-8h', '8h-12h', '12h-16h', '16h-20h', '20h-24h'];
  public polarAreaChartData: any[] = [
    { data: [65, 59, 30, 20, 10, 3] }
  ];
  public polarAreaLegend: boolean = true;
  public polarAreaChartType: string = 'polarArea';
  activeToggle0: String = "btn btn-outline-secondary";
  activeToggle1: String = "btn btn-outline-secondary";
  activeToggle2: String = "btn btn-outline-secondary";
  activeToggle3: String = "btn btn-outline-secondary";
  activeToggle4: String = "btn btn-outline-secondary";

  ngOnInit(): void {
    this.getStaticsLine(1);
    this.getRankByDate(-1);
  }

  public getStaticsLine(type:number){
    if(type == 0) {
      this.activeToggle0 = "btn btn-outline-secondary active";
    } else  {
      this.activeToggle0 = "btn btn-outline-secondary";
    }
    if(type == 1) {
      this.activeToggle1 = "btn btn-outline-secondary active";
    } else  {
      this.activeToggle1 = "btn btn-outline-secondary";
    }
    if(type == 2) {
      this.activeToggle2 = "btn btn-outline-secondary active";
    } else  {
      this.activeToggle2 = "btn btn-outline-secondary";
    }
    this.dashboardService.getStaticLine(type).subscribe(data => {
      this.lineChartLabels = data.labels; 
      this.lineChartData[0].data = data.datasets[0];
      this.lineChartData[1].data = data.datasets[1];
      this.orderTotal = data.orderTotal;
      this.incomeTotal = data.incomeTotal;
    });
  }
  public getRankByDate(month: number){
    if(month == -1) {
      this.activeToggle3 = "btn btn-outline-secondary active";
    } else  {
      this.activeToggle3 = "btn btn-outline-secondary";
    }
    if(month == -12) {
      this.activeToggle4 = "btn btn-outline-secondary active";
    } else  {
      this.activeToggle4 = "btn btn-outline-secondary";
    }
    this.dashboardService.getFoodRankDashboard(10,month).subscribe(data => {
      this.rows = data;
    });

    this.dashboardService.getFoodRankWithQuantity(5,month).subscribe(data => {
      this.barChartLabels = data.labels;
      this.barChartData[0].data = data.datasets[0];
    });

    this.dashboardService.getrankFrameTime(month).subscribe(data => {
      this.polarAreaChartLabels = data.labels;
      this.polarAreaChartData[0].data = data.datasets[0];
    });

  }
}
