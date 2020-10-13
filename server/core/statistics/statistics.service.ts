import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { VideoBasicInfo } from '../videos/schemas/video-basic-info.schema';
import { Statistic } from './schema/statistic.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(VideoBasicInfo.name)
    private readonly videoModel: Model<VideoBasicInfo>,
    @InjectModel(Statistic.name)
    private readonly statisticModel: Model<Statistic>
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async fetchStatistics() {
    const videoBasicInfoCount = await this.videoModel.estimatedDocumentCount().exec();

    // this.statisticModel.
  }
}
