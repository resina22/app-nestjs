import { HttpModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JSONPlaceholderService } from '../jsonplaceholder/jsonplaceholder.service'
import { UserController } from './user.controller'
import { LogModule } from '../log/log.module'
import { UserService } from './user.service'
import { User } from './user.entity'

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([User]),
    LogModule,
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    JSONPlaceholderService,
  ],
})
export class UserModule {}
