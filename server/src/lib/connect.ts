import { IMain, IDatabase } from "pg-promise";
import pgPromise from "pg-promise";

const pgp: IMain = pgPromise();

const cn: string = process.env.DB_URL!;
export const db: IDatabase<any> = pgp(cn);
