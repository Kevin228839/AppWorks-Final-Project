const { pool } = require('./mysqlcon');

const getStrategyArgs = async (strategy) => {
  const conn = await pool.getConnection();
  try {
    const [res] = await conn.query('SELECT * FROM strategy WHERE strategy_name=?', [strategy]);
    await conn.query('COMMIT');
    return res;
  } catch (err) {
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

module.exports = {
  getStrategyArgs
};
