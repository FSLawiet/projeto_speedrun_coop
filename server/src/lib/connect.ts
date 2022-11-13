import { IMain, IDatabase } from "pg-promise";
import pgPromise from "pg-promise";

const pgp: IMain = pgPromise();

const cn: any = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: true,
};

export const db: IDatabase<any> = pgp(cn);
