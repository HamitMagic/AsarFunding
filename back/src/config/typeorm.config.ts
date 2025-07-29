import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { join } from 'path';

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  username: process.env.DATABASE_USERNAME ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'postgres',
  database: process.env.DATABASE_NAME ?? 'database',
  autoLoadEntities: true,
  synchronize: true,
  entities: [join(__dirname, '..', 'resources', '**', '*.entity.{ts,js}')],
});
