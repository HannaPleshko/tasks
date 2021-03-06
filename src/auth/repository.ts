import { pool } from '../database';

const findLogin = async (login: string): Promise<iAuth | null> => {
  try {
    const sql = 'SELECT * FROM users WHERE login = $1';
    const arrOfVal = (await pool.query(sql, [login])).rows[0];
    return arrOfVal;
  } catch (err) {
    console.log(`Exception in findLogin: ${err}`);
    return null;
  }
};

const createNewUser = async (login: string, password: string): Promise<iAuth | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'INSERT INTO users (login, password, status) VALUES($1, $2, 0) RETURNING users.*';
    const arrOfVal = (await client.query(sql, [login, password])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in createNewUser: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

const hardDelUser = async (login: string): Promise<iAuth | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'DELETE FROM users WHERE login = $1 RETURNING users.*';
    const arrOfVal = (await client.query(sql, [login])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in hardDelUser: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

const delUser = async (login: string): Promise<iAuth | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'UPDATE users SET status = 1 WHERE login = $1 RETURNING users.*';
    const arrOfVal = (await client.query(sql, [login])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in delUser: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

export { createNewUser, findLogin, hardDelUser, delUser };
