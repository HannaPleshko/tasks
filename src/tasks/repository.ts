import { pool } from '../database';

const createNewTask = async (title: string, description: string): Promise<iTask | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'INSERT INTO tasks (title, description) VALUES($1, $2) RETURNING tasks.*';
    const arrOfVal = (await client.query(sql, [title, description])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in createNewTask: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

const getAllTasksDB = async (): Promise<iTask[] | null> => {
  try {
    const arrOfVal = (await pool.query(`SELECT * FROM tasks`)).rows;
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in getTaskById: ${err}`);
    return null;
  }
};

const getTaskById = async (id: number): Promise<iTask | null> => {
  try {
    const sql = 'SELECT * FROM tasks WHERE id = $1';
    const arrOfVal = (await pool.query(sql, [id])).rows;
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in getTaskById: ${err}`);
    return null;
  }
};

const updateTaskById = async (id: number, title: string, description: string): Promise<iTask | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING tasks.*';
    const arrOfVal = (await client.query(sql, [title, description, id])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in updateTaskById: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

const deleteTaskById = async (id: number): Promise<iTask | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'DELETE FROM tasks WHERE id = $1 RETURNING tasks.*';
    const arrOfVal = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in updateTaskById: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

export { createNewTask, getAllTasksDB, getTaskById, updateTaskById, deleteTaskById };
