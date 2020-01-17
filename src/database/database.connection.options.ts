import { ConnectionOptions } from "typeorm";
import { join } from "path";

import * as dotenv from 'dotenv'
dotenv.config()

const parentDir = join(__dirname, "..");
const connectionOpts: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "nscholl",
  entities: [`${parentDir}/entity/**/*.entity.ts`],
  migrations: [`${parentDir}/migration/**/*.migration.ts`],
  subscribers: [`${parentDir}/subscriber/**/*.subscriber.ts`],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  },
  synchronize: true
};
module.exports = connectionOpts
