import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './shared/services/portfolio/portfolio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private portfolioService: PortfolioService){

  }
  ngOnInit(): void {
      this.portfolioService.getPortfolioList();
  }
}
