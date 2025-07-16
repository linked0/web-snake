import { Router, Request, Response, NextFunction } from "express";
import { RPC_URL, CONTRACT_ADDRESS } from "../config";
import { getDB } from "../db";
import { Contract, JsonRpcProvider, isAddress } from "ethers";
import MyToken from "../abis/MyToken.json";

const tokenRouter = Router();

const provider = new JsonRpcProvider(RPC_URL);

if (!CONTRACT_ADDRESS) {
  throw new Error("Missing CONTRACT_ADDRESS!");
}

const contract = new Contract(CONTRACT_ADDRESS, MyToken.abi, provider);

/**
 * POST /mint
 *  - 1초 이내에 응답
 *  - DB에 PENDING으로 기록 후 바로 응답
 *  - 백그라운드에서 트랜잭션 처리
 */
tokenRouter.post(
  "/mint",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = req.query.address as string;
      if (!address || !isAddress(address)) {
        return res.status(400).json({ error: "Invalid address parameter" });
      }

      const db = await getDB();
      const createdAt = new Date().toISOString();

      await db.run(
        `INSERT INTO mint_requests (userAddress, txHash, status, createdAt)
       VALUES (?, ?, ?, ?)`,
        [address, "", "PENDING", createdAt]
      );

      // 1초 이내 곧바로 응답
      return res.json({
        message: "Mint request accepted. It will be processed soon.",
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * GET /
 *  - index 페이지
 */
tokenRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 간단한 index 페이지
      return res.send(`
      <h1>Token API</h1>
      <p>GET /balance</p>
      <p>GET /balanceOf</p>
      <p>GET /history</p>
    `);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * GET /balanceOf
 *  - 실제 컨트랙트 잔액 조회
 */
tokenRouter.get(
  "/balanceOf",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = req.query.address as string;
      if (!address || !isAddress(address)) {
        return res.status(400).json({ error: "Invalid address parameter" });
      }
      const balance = await contract.balanceOf(address);
      // 필요한 경우 balance를 1e18로 나누어 표시해도 되지만, 여기서는 raw 값 그대로
      return res.json({ balance: balance.toString() });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * GET /history
 *  - address별로 최근 100개 요청을 createdAt DESC로 반환
 */
tokenRouter.get(
  "/history",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = req.query.address as string;
      if (!address || !isAddress(address)) {
        return res.status(400).json({ error: "Invalid address parameter" });
      }

      const db = await getDB();
      const rows = await db.all(
        `SELECT txHash as tx, status, createdAt
       FROM mint_requests
       WHERE userAddress = ?
       ORDER BY createdAt DESC
       LIMIT 100`,
        [address]
      );
      return res.json(rows);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * 에러 핸들링 예시 (NextFunction 사용)
 */
tokenRouter.use(
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
);

export default tokenRouter;
