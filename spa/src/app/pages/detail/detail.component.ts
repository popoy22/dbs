import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [MdbTableDirective],
})
export class DetailComponent implements OnInit {
  symbol: string = '';
  pricings: any;
  pricings2: any;
  market_price: any = [];
  event_time: any = [];
  segment: string = 'data';

  constructor(
    private apiService: ApiService,
    private mdbTable: MdbTableDirective,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDetail();
  }

  loadDetail() {
    this.symbol = this.activatedRoute.snapshot.params.symbol;
    this.apiService.get('pricings/' + this.symbol).subscribe((data) => {
      this.pricings = data;

      for (let i in this.pricings) {
        this.market_price.push(this.pricings[i].market_price);
        this.event_time.push(this.pricings[i].event_time);
      }
      this.chartLabels = this.event_time.reverse();
      this.chartDatasets[0].data = this.market_price.reverse();
    });
  }

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [0, 0, 0], label: 'Market Price' },
  ];

  public chartLabels: Array<any> = ['xx', 'xxx', 'xxx'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            start: 0,
          },
        },
      ],
    },
  };
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}

  returnZero() {
    return 0;
  }
}
