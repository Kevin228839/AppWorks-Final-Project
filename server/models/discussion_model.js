const { pool } = require('./mysqlcon');

const postContent = async (userId, text) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('INSERT INTO discussion (user_id, context) VALUES(?,?)', [userId, text]);
    await conn.query('COMMIT');
  } catch (err) {
    console.error('Error while posting content! ', err.message);
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

const getContent = async (page) => {
  const conn = await pool.getConnection();
  try {
    const itemPerPage = 3;
    const offset = page * itemPerPage;
    let nextPage;
    const [res] = await conn.query('SELECT user_profile.name, discussion.context FROM discussion INNER JOIN user_profile ON discussion.user_id=user_profile.user_id ORDER BY post_id DESC LIMIT ?, ?', [offset, itemPerPage]);
    const [next] = await conn.query('SELECT user_profile.name, discussion.context FROM discussion INNER JOIN user_profile ON discussion.user_id=user_profile.user_id ORDER BY post_id DESC LIMIT ?, ?', [offset + itemPerPage, itemPerPage]);
    if (next.length !== 0) {
      nextPage = parseInt(page) + 1;
    } else {
      nextPage = null;
    }
    await conn.query('COMMIT');
    return { data: res, nextPage };
  } catch (err) {
    console.error('Error while getting content! ', err.message);
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

module.exports = {
  postContent,
  getContent
};
