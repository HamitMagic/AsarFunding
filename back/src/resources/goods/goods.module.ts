import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from './entities/good.entity';
import { Supplier } from '../supplier/entities/supplier.entity';
import { SupplierService } from '../supplier/supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Good, Supplier])],
  controllers: [GoodsController],
  providers: [GoodsService, SupplierService],
})
export class GoodsModule {}
