import { ConfigifyModule } from '@itgorillaz/configify';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigifyModule.forRootAsync()],
  exports: [ConfigifyModule],
})
export class ConfigsModule {}
