import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingsController } from './listings.controller';
import { ListingsModule } from './listing.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';





@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/kleinanzeigen'), ListingsModule, ConfigModule.forRoot({
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      PORT: Joi.number(),
    }),
  }), HttpModule, DatabaseModule,UsersModule,AuthModule],
  controllers: [AppController,ListingsController],
  providers: [AppService],

})
export class AppModule {}
