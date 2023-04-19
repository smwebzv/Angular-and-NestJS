import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/shared/services/portfolio/portfolio.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Portfolio } from 'src/app/store/models/portfolio.model';
import { Store } from '@ngrx/store';
import { State } from '../../../store/models/state.model';

@Component({
  selector: 'app-porftfolio',
  templateUrl: './porftfolio.component.html',
  styleUrls: ['./porftfolio.component.scss'],
})
export class PorftfolioComponent implements OnInit {
  public portfolioForm?: FormGroup;
  portfolios$?: Observable<Array<Portfolio>>;
  portfolioForDelete: string = '';
  portfolioIdForEdit: string = '';

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private store: Store<State>
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.portfolios$ = this.store.select('portfolios');
    this.createForm();
  }

  createForm() {
    this.portfolioForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      customer_link: '',
      hidden: false,
      image: '',
    });
  }

  onFileInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files || [];
    this.portfolioForm?.patchValue({
      image: files[0],
    });
  }

  openPortfolioModal(content: TemplateRef<HTMLElement>) {
    this.portfolioIdForEdit = '';
    this.portfolioForm?.reset();
    this.modalService.open(content);
  }

  createPortfolio() {
    if (this.portfolioForm?.valid) {
      const rawData = this.portfolioForm?.getRawValue();

      const formData = new FormData();
      formData.append('title', rawData.title);
      formData.append('description', rawData.description);
      if (rawData.customer_link)
        formData.append('customer_link', rawData.customer_link);
      formData.append('file', rawData.image);
      formData.append('hidden', rawData.hidden ? '1' : '');

      if (this.portfolioIdForEdit) {
        this.portfolioService.editPortfolio(formData, this.portfolioIdForEdit);
      } else {
        this.portfolioService.addPortfolio(formData);
      }

      this.modalService.dismissAll();
    }
  }

  openDeleteModal(content: TemplateRef<HTMLElement>, portfolioId: string) {
    this.openPortfolioModal(content);
    this.portfolioForDelete = portfolioId;
  }

  deletePortfolio() {
    this.portfolioService.deletePortfolio(this.portfolioForDelete);
    this.modalService.dismissAll();
  }

  openEditPortfolioModal(data: Portfolio, content: TemplateRef<HTMLElement>) {
    this.portfolioIdForEdit = data.id;
    this.portfolioForm?.patchValue({
      ...data,
    });
    this.modalService.open(content);
  }
}
