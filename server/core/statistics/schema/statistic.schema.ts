import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Statistic extends Document {
  @Prop()
  videoBasicInfoCount: number;

  @Prop()
  videoInfoCount: number;

  @Prop()
  channelBasicInfoCount: number;

  @Prop()
  CachedChannelThumbnailCount: number;

  @Prop()
  registeredUserCount: number;
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);
