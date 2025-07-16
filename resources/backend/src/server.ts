import { App } from "./app";
import { startQueue } from "./queue";
import { PORT } from "./config";
import { getDB } from "./db";

async function main() {
  // DB 초기화 (테이블 생성)
  await getDB();

  // 백그라운드 큐 시작
  startQueue();

  // Express 앱 구동
  const port = PORT || 3000;
  const app = new App();
  app.expressApp.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

main().catch(console.error);
