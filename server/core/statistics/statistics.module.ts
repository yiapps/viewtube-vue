import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChannelBasicInfo,
  ChannelBasicInfoSchema
} from '../channels/schemas/channel-basic-info.schema';
import { VideoBasicInfo, VideoBasicInfoSchema } from '../videos/schemas/video-basic-info.schema';
import { Video, VideoSchema } from '../videos/schemas/video.schema';
import { Statistic, StatisticSchema } from './schema/statistic.schema';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 300,
      max: 200
    }),
    MongooseModule.forFeature([
      {
        name: Video.name,
        schema: VideoSchema,
        collection: 'videos'
      },
      {
        name: VideoBasicInfo.name,
        schema: VideoBasicInfoSchema,
        collection: 'videos-basicinfo'
      },
      {
        name: ChannelBasicInfo.name,
        schema: ChannelBasicInfoSchema,
        collection: 'channel-basicinfo'
      },
      {
        name: Statistic.name,
        schema: StatisticSchema,
        collection: 'statistics'
      }
    ])
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
