import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Portfolio } from '../../../store/models/portfolio.model';
import { Store } from '@ngrx/store';
import { State } from '../../../store/models/state.model';
import {
  AddPortfolioAction,
  DeletePortfolioAction,
  GetPortfoliosAction,
  UpdatePortfolioAction,
} from 'src/app/store/actions/portfolio.actions';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private http: HttpClient, private store: Store<State>) {}

  getPortfolioList() {
    this.http
      .get<Portfolio[]>(environment.BASE_URL + `api/portfolios`)
      .subscribe((portfolio) => {
        this.store.dispatch(GetPortfoliosAction({ payload: portfolio }));
      });
  }

  addPortfolio(formData: FormData) {
    this.http
      .post<Portfolio>(environment.BASE_URL + `api/portfolios`, formData)
      .subscribe((portfolio) => {
        this.store.dispatch(AddPortfolioAction({ payload: portfolio }));
      });
  }

  editPortfolio(formData: FormData, portfolioId: string) {
    this.http
      .put<Portfolio>(
        environment.BASE_URL + `api/portfolios/${portfolioId}`,
        formData
      )
      .subscribe((portfolio) => {
        this.store.dispatch(
          UpdatePortfolioAction({ payload: { portfolio, id: portfolioId } })
        );
      });
  }

  deletePortfolio(id: string) {
    this.http
      .delete(environment.BASE_URL + `api/portfolios/${id}`)
      .subscribe(() => {
        this.store.dispatch(DeletePortfolioAction({ payload: id }));
      });
  }
}
