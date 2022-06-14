const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('./mysqlcon');

// for user signup api
async function signUp (requestBody) {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');
    // check whether email address has been used
    const [rows] = await conn.query(
      'SELECT email FROM user_profile'
    );
    let flag = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].email === requestBody.email) {
        flag = 1;
      }
    }
    // insert signup info if the email hasn't been used before
    if (flag === 1) {
      await conn.query('COMMIT');
      return -1;
    } else {
      // create hash algorithm, hash password
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(requestBody.password, salt);
      // insert info into db
      await conn.query(
        'INSERT INTO user_profile (name, email, password, salt) VALUES (?, ?, ?, ?)', [requestBody.name, requestBody.email, hashPassword, salt]
      );
      await conn.query('COMMIT');
      return 1;
    }
  } catch (err) {
    console.error('Error while signing up! ', err.message);
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
}

// for user signin api
async function signIn (requestBody) {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');
    const [rows] = await conn.query(
      'SELECT user_id, name, email, password, salt FROM user_profile WHERE email = ?', [requestBody.email]
    );
    console.log(rows);
    // check if the email is registed
    if (rows.length === 0) {
      await conn.query('COMMIT');
      return -1;
    } else {
      // check if the password is correct
      if (bcrypt.hashSync(requestBody.password, rows[0].salt) === rows[0].password) {
        await conn.query('COMMIT');
        // generate jwt
        const token = jwt.sign({ userid: rows[0].user_id, user: rows[0].name, email: rows[0].email }, process.env.secret);
        return token;
      } else {
        await conn.query('COMMIT');
        return -1;
      }
    }
  } catch (err) {
    await conn.query('ROLLBACK');
    console.log(err);
    throw err;
  } finally {
    await conn.release();
  }
}

module.exports = {
  signUp,
  signIn
};
