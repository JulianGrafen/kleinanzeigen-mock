import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingsController } from './listings.controller';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/vencio')],
  controllers: [AppController,ListingsController],
  providers: [AppService],
})
export class AppModule {}
