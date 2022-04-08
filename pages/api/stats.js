import jwt from "jsonwebtoken";
import { findVideoByUserIdAndVideoId } from "../../lib/db/hasura";

const stats = async (req, res) => {
  if (req.method === "POST") {
    try {
      const videoId = req.query.videoId;
      const token = req.cookies.token;
      if (!token) {
        return res.status(403).send({});
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log({ decodedToken });
      const userId = decodedToken.issuer;
      const findVideoId = await findVideoByUserIdAndVideoId(
        userId,
        videoId,
        token
      );

      res.send({ message: "works", decodedToken, findVideoId });
    } catch (error) {
      console.error("Error occurred /stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }
  }
};
export default stats;
