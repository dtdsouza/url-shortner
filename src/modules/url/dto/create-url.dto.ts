import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortUrlDto {
  @IsString()
  @ApiProperty({ type: String })
  url!: string;
}
