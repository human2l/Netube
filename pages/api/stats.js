import jwt from "jsonwebtoken";
import { findVideoByUserIdAndVideoId } from "../../lib/db/hasura";

const stats = async (req, res) => {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(403).send({});
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log({ decoded });
      const userId = `did:ethr:0xCdfe8EF9086736823e3fe751F4239264c459B74a`;
      const videoId = "4zH5iYM4wJo";
      const findVideoId = await findVideoByUserIdAndVideoId(
        userId,
        videoId,
        token
      );

      res.send({ message: "works", decoded, findVideoId });
    } catch (error) {
      console.error("Error occurred /stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }
  }
};
export default stats;
