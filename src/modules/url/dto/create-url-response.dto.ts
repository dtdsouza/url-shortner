import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortUrlResponseDto {
  @IsString()
  @ApiProperty({ type: String })
  newUrl!: string;
}
