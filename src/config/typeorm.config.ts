import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 2213,
    username: 'postgres',
    password: 'posgres',
    database: 'taskmanagement',
    entities: ['./src/../**/*.entity.ts', './dist/../**/*.entity.js'],
    synchronize:true,
    logging:true
};