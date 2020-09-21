import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from '../config/database.module'
import { LogModule } from './log/log.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    LogModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
