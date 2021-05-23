import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetShortUrlResponseDto {
  @IsString()
  @ApiProperty({ type: String })
  url!: string;
}
