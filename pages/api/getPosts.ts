import db from "../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default function getPosts(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(db);
}
