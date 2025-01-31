import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { Request, Response } from 'express';

export default interface ReqContext {
  req: Request;
  res: Response;
  em: EntityManager<IDatabaseDriver<Connection>>;
}
