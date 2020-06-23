import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
  providers: [MdbTableDirective],
})
export class StocksComponent implements OnInit {
  searchText: string = '';
  dSource: any = [];
  elements: any = [];
  stocks: any;
  headElements = ['Symbol', 'Price', 'Trend'];

  constructor(
    private apiService: ApiService,
    private mdbTable: MdbTableDirective
  ) {}
  ngOnInit(): void {
    this.loadStocks();
    setInterval(() => {
      this.loadStocks();
    }, 1000);
  }

  loadStocks() {
    this.apiService.get('pricings').subscribe((data: any) => {
      this.stocks = data;
    });
  }
  returZero() {
    return 0;
  }
}
