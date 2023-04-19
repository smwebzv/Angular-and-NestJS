import { createSelector } from "@ngrx/store";
import { Portfolio } from "./portfolio.model";

export interface State {
  readonly portfolios: Array<Portfolio>;
}

export const selectUnhidenPortfolios = (state: State) => state.portfolios.filter(item => !item.hidden);