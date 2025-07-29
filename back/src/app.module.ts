import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { GoodsModule } from './resources/goods/goods.module';
import { SupplierModule } from './resources/supplier/supplier.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: typeOrmConfig }),
    SupplierModule,
    GoodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
