import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Good } from './entities/good.entity';
import { Repository } from 'typeorm';
import { Supplier } from '../supplier/entities/supplier.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Good) private readonly repository: Repository<Good>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async create(dto: CreateGoodDto) {
    let good = await this.repository.findOne({ where: { name: dto.name } });
    const supplier = await this.supplierRepository.findOne({
      where: { id: dto.supplier.id },
    });
    if (!supplier) {
      throw new HttpException('no such supplier', HttpStatus.BAD_REQUEST);
    }
    if (good) {
      good.supplierList.push(supplier);
      return this.repository.save(good);
    }
    good = this.repository.create({
      ...dto,
      supplierList: [],
    });
    return await this.repository.save(good);
  }
  async findAll() {
    return await this.repository.find({ relations: ['supplierList'] });
  }
  async findOne(id: string) {
    const currentItem = await this.repository.findOne({
      where: { id },
      relations: ['supplierList'],
    });
    if (!currentItem) {
      throw new HttpException('no such good', HttpStatus.BAD_REQUEST);
    }
    return currentItem;
  }
}
