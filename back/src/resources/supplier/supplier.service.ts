import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly repository: Repository<Supplier>,
  ) {}

  async create(dto: CreateSupplierDto) {
    const now = Date.now();
    const supplier = this.repository.create({
      ...dto,
      expireAt: new Date(now + dto.expireAt * 24 * 60 * 60 * 1000),
    });
    return await this.repository.save(supplier);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const supplier = await this.repository.findOne({ where: { id } });
    if (!supplier) {
      throw new HttpException('no such supplier', HttpStatus.BAD_REQUEST);
    }
    return supplier;
  }
}
