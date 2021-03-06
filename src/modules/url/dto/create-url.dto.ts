import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortUrlDto {
  @IsString()
  @IsUrl()
  @ApiProperty({ type: String })
  url!: string;
}
