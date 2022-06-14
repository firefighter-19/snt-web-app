import { Module } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConverterResolver } from './converter.resolver';

@Module({
  providers: [ConverterService, ConverterResolver]
})
export class ConverterModule {}
