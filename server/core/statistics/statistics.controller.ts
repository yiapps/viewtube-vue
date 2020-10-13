import { CacheInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Core')
@UseInterceptors(CacheInterceptor)
@Controller('statistics')
export class StatisticsController {}
