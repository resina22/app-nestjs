import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '../src/address/address.entity';
import { Contact } from '../src/contact/contact.entity';
import { User } from '../src/user/user.entity';

export default [
  HttpModule,
  ConfigModule.forRoot({
    envFilePath: '.env.test'
  }),
  TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [
      User,
      Address,
      Contact,
    ],
    synchronize: true,
  }),
]
