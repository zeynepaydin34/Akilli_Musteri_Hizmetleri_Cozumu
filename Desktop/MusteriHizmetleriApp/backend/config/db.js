import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
    host: "localhost",
    user: "postgres",
    password: "Postgres123!",
    database: "CustomerService",
    port: 5432
});

export default db;
