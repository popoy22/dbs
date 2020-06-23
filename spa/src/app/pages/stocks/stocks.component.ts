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
    }, 10000);
  }

  loadStocks() {
    this.apiService.get('pricings').subscribe((data: any) => {
      this.stocks = data;
      for (let i in this.stocks) {
        var x = {
          symbol: this.stocks[i].symbol,
          price: parseInt(this.stocks[i].price),
          difference: parseInt(this.stocks[i].difference),
        };
        this.elements.push(x);
      }
      this.mdbTable.setDataSource(this.elements);
    });
  }
  returZero() {
    return 0;
  }

  searchItems() {
    if (!this.searchText) {
      this.elements = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
    }
  }
}
