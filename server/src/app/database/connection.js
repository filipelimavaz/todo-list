import pg from "pg";

const Pool = pg.Pool;

const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "todo_db",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.connect();

export const connectionQuery = async (sql, params, errorMessage) => {
  try {
      const result = await pool.query(sql, params);
      return result.rows;
  } catch (error) {
      console.error(`${errorMessage}: ${error.message}`);
      throw error;
  }
};

export default pool;
