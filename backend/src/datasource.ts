import { DataSource } from "typeorm";

export const datasource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "thegoodcorner",
    password: "supersecret",
    database: "thegoodcorner",
    entities: ["./src/entities/*.ts"],
    synchronize: true,
    logging: true,
});