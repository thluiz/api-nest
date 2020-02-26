import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.SQL_HOST,
  port: 5432,
  database: process.env.SQL_DATABASE,
  password: process.env.SQL_PASSWORD,
  username: process.env.SQL_USER,  
  entities: [join(__dirname, '../', '**', '*.entity.{ts,js}'), join(__dirname, '../', 'entity', '*.entity.ts')],
  migrations: [join(__dirname, '../', '**', 'migrations', '*.{ts,js}')],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migrations',
  },
  synchronize: false,
  logging: false
};

export = config;
