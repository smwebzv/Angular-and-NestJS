import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PorftfolioComponent } from './porftfolio/porftfolio.component';

const routes: Routes = [
  {
    path: "portfolio",
    component: PorftfolioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
