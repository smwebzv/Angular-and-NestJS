import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioDto } from './dto/portfolio.dto';
import * as fs from 'fs';
import { UpdatePortfolioDto } from './dto/updatePortfolio.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepo: Repository<Portfolio>,
  ) {}

  getAllPortfolios() {
    return this.portfolioRepo.find();
  }

  createPortfolio(data: PortfolioDto, fileUrl: string) {
    const portfolioData = {
      ...data,
      fileUrl: fileUrl,
      hidden: !!data.hidden
    }
    return this.portfolioRepo.save(portfolioData);
  }

  async deletePortfolio(id: number) {
    const portfolio = await this.portfolioRepo.findOne({ where: { id } });
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    if (portfolio.fileUrl) fs.unlink(portfolio.fileUrl, (_) => {});

    return this.portfolioRepo.delete(id);
  }

  getPortfolioById(id: number) {
    return this.portfolioRepo.findOne({ where: { id } });
  }

  async updatePortfolioById(
    id: number,
    data: UpdatePortfolioDto,
    fileUrl: string,
  ) {
    const portfolio = await this.portfolioRepo.findOne({ where: { id } });
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    if (fileUrl) {
      if (portfolio.fileUrl) fs.unlink(portfolio.fileUrl, (_) => {});
    }

    portfolio.fileUrl = fileUrl ? fileUrl : portfolio.fileUrl;
    portfolio.hidden = !!data.hidden;
    portfolio.title = data.title;
    portfolio.description = data.description;
    portfolio.customer_link = data.customer_link;

    return this.portfolioRepo.save(portfolio);
  }

  clearDatabase(){
    this.portfolioRepo.clear();
  }
}
