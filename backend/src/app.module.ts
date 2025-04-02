import { Module } from '@nestjs/common';
import { ConfigsModule } from './modules/configs/configs.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { BasicAuthGuard } from './guards/basic-auth.guard';

@Module({
  imports: [ConfigsModule, ScheduleModule.forRoot(), OrdersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: BasicAuthGuard,
    },
  ],
})
export class AppModule {}
