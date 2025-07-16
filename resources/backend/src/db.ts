import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

/**
 * SQLite 연결을 반환
 */
let dbConnection: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function getDB() {
  if (!dbConnection) {
    dbConnection = await open({
      filename: './mint-requests.db',
      driver: sqlite3.Database,
    });

    // 테이블이 없으면 생성
    await dbConnection.run(`
      CREATE TABLE IF NOT EXISTS mint_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userAddress TEXT,
        txHash TEXT,
        status TEXT,
        createdAt TEXT
      )
    `);

    // courses 테이블 생성
    await dbConnection.run(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        chapters TEXT,
        progress INTEGER,
        total INTEGER
      )
    `);

    // Fetch how many courses exist
    // Using get(...) returns one row, not an array
    const row = await dbConnection.get<{ count: number }>(`
      SELECT COUNT(*) as count
      FROM courses
    `);

    // row might be undefined if the query returns no rows, so check before using.
    if (row && row.count === 0) {
      // Insert 2 sample courses
      await dbConnection.run(`
        INSERT INTO courses (title, chapters, progress, total)
        VALUES
          (
            'Learn Go for Developers',
            '["Variables","Conditionals","Functions","Structs","Interfaces"]',
            70,
            168
          ),
          (
            'Learn to Code in Python',
            '[]',
            0,
            161
          )
      `);
    }
  }
  return dbConnection;
}
