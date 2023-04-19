import { createAction, props } from '@ngrx/store';
import { Portfolio } from '../models/portfolio.model';

export enum PortfolioActionType {
  GET_ALL = '[PORTFOLIO] Get all Portfolios',
  ADD_ITEM = '[PORTFOLIO] Add Portfolio',
  DELETE_ITEM = '[PORTFOLIO] Delete Portfolio',
  UPDATE_ITEM = '[PORTFOLIO] Update Portfolio',
}

export const AddPortfolioAction = createAction(
  PortfolioActionType.ADD_ITEM,
  props<{ payload: Portfolio }>()
);

export const GetPortfoliosAction = createAction(
  PortfolioActionType.GET_ALL,
  props<{ payload: Portfolio[] }>()
);

export const DeletePortfolioAction = createAction(
  PortfolioActionType.DELETE_ITEM,
  props<{ payload: string }>()
);

export const UpdatePortfolioAction = createAction(
  PortfolioActionType.UPDATE_ITEM,
  props<{ payload: { portfolio: Portfolio; id: string } }>()
);
