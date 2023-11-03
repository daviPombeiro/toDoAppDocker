import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserspModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), UserspModule],
})
export class AppModule { }
