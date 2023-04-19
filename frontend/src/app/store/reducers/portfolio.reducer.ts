import { Action, createReducer, on } from '@ngrx/store';
import {
  AddPortfolioAction,
  DeletePortfolioAction,
  GetPortfoliosAction,
  UpdatePortfolioAction,
} from '../actions/portfolio.actions';
import { Portfolio } from '../models/portfolio.model';

const initialState: Array<Portfolio> = [];

const reducer = createReducer(
  initialState,
  on(GetPortfoliosAction, (state, action) => {
    return [...state, ...action.payload];
  }),
  on(AddPortfolioAction, (state, action) => {
    return [...state, action.payload];
  }),
  on(DeletePortfolioAction, (state, action) => {
    const filteredState = state.filter((item) => item.id !== action.payload);
    return filteredState;
  }),
  on(UpdatePortfolioAction, (state, action) => {
    const updatedState = state.map((portfolio: Portfolio) => {
      if (portfolio.id === action.payload.id)
        portfolio = action.payload.portfolio;
      return portfolio;
    });
    return updatedState;
  })
);

export function PortfolioReducer(
  state: Array<Portfolio> | undefined,
  action: Action
) {
  return reducer(state, action);
}

export const selectPortfolios = (state: Portfolio) => state;
