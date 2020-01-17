import { createConnection, Connection, ConnectionOptions } from "typeorm";
const connectionOpts: ConnectionOptions = require("./database.connection.options");
const connection: Promise<Connection> = createConnection(connectionOpts);

export default connection;
