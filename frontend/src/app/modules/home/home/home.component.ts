import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Portfolio } from 'src/app/store/models/portfolio.model';
import {
  State,
  selectUnhidenPortfolios,
} from 'src/app/store/models/state.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  portfolios$?: Observable<Array<Portfolio>>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.portfolios$ = this.store.select(selectUnhidenPortfolios);
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
