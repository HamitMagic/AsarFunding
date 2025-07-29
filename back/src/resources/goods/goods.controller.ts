import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import * as XLSX from 'xlsx';
import { extractNumbers } from 'src/utils/utils';
import { CreateGoodDto } from './dto/create-good.dto';
import { GoodsService } from './goods.service';
import { SupplierService } from '../supplier/supplier.service';
import { Supplier } from '../supplier/entities/supplier.entity';

@Controller('goods')
export class GoodsController {
  constructor(
    private readonly goodsService: GoodsService,
    private readonly supplierService: SupplierService,
  ) {}

  @Get()
  async findAll() {
    return await this.goodsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.goodsService.findOne(id);
  }

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new Error('error uploading file');
    }
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const goods = [] as Omit<CreateGoodDto, 'expireAt'>[];

    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i] as CreateGoodDto;
      if (!Array.isArray(row)) continue;
      goods.push({
        name: String(row[1]),
        supplier: {
          name: String(row[5]),
          measure: String(row[2]),
          price: Number(row[4]),
          amount: Number(row[3]),
        } as Supplier,
      });
      if (row.length === 2) {
        const expireAt = extractNumbers(row[1] as string);
        for (let j = 0; j < goods.length; j++) {
          if (
            typeof goods[j].supplier.amount !== 'number' ||
            typeof goods[j].supplier.price !== 'number' ||
            isNaN(goods[j].supplier.amount) ||
            isNaN(goods[j].supplier.price) ||
            !goods[j].supplier.name
          ) {
            continue;
          }
          const supplier = await this.supplierService.create({
            name: goods[j].supplier.name,
            price: goods[j].supplier.price,
            amount: goods[j].supplier.amount,
            measure: goods[j].supplier.measure,
            expireAt,
          });
          await this.goodsService.create({
            name: goods[j].name,
            supplier: supplier,
          });
        }
        break;
      }
    }
    return { success: true };
  }
}
