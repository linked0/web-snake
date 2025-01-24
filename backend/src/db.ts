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
  }
  return dbConnection;
}
