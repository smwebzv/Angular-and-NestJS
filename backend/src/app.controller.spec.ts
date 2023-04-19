import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createTestingModule } from './testing/testing.module';

const PortfolioData = {
  fileUrl: null,
  id: 1,
  title: 'Testing Title',
  description: 'This is for testing purpose',
  hidden: true,
  customer_link: null,
};

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await createTestingModule();
    appService = moduleFixture.get<AppService>(AppService);
    appController = moduleFixture.get<AppController>(AppController);
  });

  afterAll(async () => {
    await appService.clearDatabase();
    await moduleFixture.close();
  });

  describe('portfolioCRUD', () => {
    it('should create a portfolio', async () => {
      const portfolio = await appController.addPortfolio(PortfolioData);
      jest
        .spyOn(appService, 'createPortfolio')
        .mockImplementation(async () => portfolio);
      expect(portfolio).toEqual(PortfolioData);
    });

    it('should return portfolio list', async () => {
      const portfolios = await appController.getPortfolios();
      jest
        .spyOn(appService, 'getAllPortfolios')
        .mockImplementation(async () => portfolios);
      expect(portfolios).toEqual([PortfolioData]);
    });

    it('should update portfolio', async () => {
      const updatedPortfolio = {
        ...PortfolioData,
        title: "Updated Portfolio Title"
      }
      const portfolio = await appController.updatePortfolio(1, updatedPortfolio);
      jest
        .spyOn(appService, "updatePortfolioById")
        .mockImplementation(async () => portfolio);
      expect(portfolio).toEqual(updatedPortfolio);
    });

    it('should delete portfolio', async () => {
      const portfolio = await appController.deletePortfolio(PortfolioData.id);
      jest
        .spyOn(appService, 'deletePortfolio')
        .mockImplementation(async () => portfolio);
      expect(portfolio).toBeTruthy();
    });
  });
});
