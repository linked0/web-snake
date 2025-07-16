// You can place this inside tokenRouter or a new router file.
// For example: tokenRouter.ts

import { Router, Request, Response, NextFunction } from "express";
import { getDB } from "../db";

const coursesRouter = Router();

type CourseRow = {
  id: number;
  title: string;
  chapters: string;
  progress: number;
  total: number;
};

/**
 * GET /api/courses
 *  - Returns an array of courses in JSON format
 */
coursesRouter.get(
  "/courses",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET /courses");
    try {
      const db = await getDB();
      const rows = await db.all<Array<CourseRow>>(
        `SELECT * FROM courses ORDER BY id ASC`
      );

      // Convert the chapters TEXT field from JSON string to actual array
      const courses = rows.map((row) => ({
        ...row,
        chapters: row.chapters ? JSON.parse(row.chapters) : [],
      }));

      return res.json(courses);
    } catch (error) {
      return next(error);
    }
  }
);

export { coursesRouter };
