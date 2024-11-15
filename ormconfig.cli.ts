import "dotenv/config";
import { DataSource } from "typeorm";

const ormconfig = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + "/src/database/entities/*.entity{.ts,.js}"],
  migrations: [__dirname + "/src/database/migrations/*{.ts,.js}"],
  migrationsTableName: "migrations",
  migrationsRun: true,
  synchronize: false,
  logging: false,
});

export default ormconfig;