import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Agreement } from './entities/Agreement';
import { AgreementType } from './entities/AgreementType';
// import * as migrations from "./migrations";
import { DB_HOST, DB_LOGIN, DB_NAME, DB_PASSWORD } from './env';
import { config } from 'dotenv';

config();
export const db = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: DB_LOGIN,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Agreement, AgreementType],
  // migrations: Object.values(migrations),
});
