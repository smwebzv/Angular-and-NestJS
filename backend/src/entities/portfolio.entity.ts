import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'NextJS Portfolio project' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Project about adding portfolios to user account' })
  @Column()
  description: string;

  @ApiProperty({ example: 'https://myproject.com' })
  @Column({ nullable: true })
  customer_link?: string;

  @ApiProperty()
  @Column()
  hidden: boolean;

  @ApiProperty({ example: 'https://myproject.com/portfolio_image.jpg' })
  @Column({ nullable: true })
  fileUrl: string;
}
