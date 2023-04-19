import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PortfolioDto } from './dto/portfolio.dto';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Portfolio } from './entities/portfolio.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdatePortfolioDto } from './dto/updatePortfolio.dto';

@ApiTags('Portfolios')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('portfolios')
  @ApiOperation({ summary: 'Get Portfolio list' })
  @ApiResponse({
    status: 200,
    description: 'The founded Portfolios',
    type: Portfolio,
    isArray: true,
  })
  getPortfolios() {
    return this.appService.getAllPortfolios();
  }

  @Post('portfolios')
  @ApiOperation({ summary: 'Add Portfolio' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/portfolio',
        filename: function (req, file, cb) {
          cb(null, Date.now() + extname(file.originalname));
        },
      }),
    }),
  )
  addPortfolio(
    @Body() createPortfolio: PortfolioDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.appService.createPortfolio(createPortfolio, file?.path);
  }

  @Delete('portfolios/:id')
  deletePortfolio(@Param('id') id: number) {
    return this.appService.deletePortfolio(id);
  }

  @Get('portfolios/:id')
  getPortfolioById(@Param('id') id: number) {
    return this.appService.getPortfolioById(id);
  }

  @Put('portfolios/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/portfolio',
        filename: function (req, file, cb) {
          cb(null, Date.now() + extname(file.originalname));
        },
      }),
    }),
  )
  updatePortfolio(
    @Param('id') id: number,
    @Body() updatePortfolio: UpdatePortfolioDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.appService.updatePortfolioById(id, updatePortfolio, file?.path);
  }
}
