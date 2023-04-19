import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PortfolioDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  customer_link?: string;

  hidden: boolean;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file?: Express.Multer.File;
}
