import db from "../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default function createPost(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const post = JSON.parse(req.body);
      db.unshift(post);
      res.status(200).json(db);
    } catch (e) {
      res.status(400);
    }
  } else {
    res.status(400).json({ error: "Use POST" });
  }
}
