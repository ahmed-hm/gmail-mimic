import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { TransformObjectId } from 'src/shared';

export class GetEmailDto {
  @TransformObjectId()
  @ApiProperty({ type: String })
  id: Types.ObjectId;
}
