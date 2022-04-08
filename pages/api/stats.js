import jwt from "jsonwebtoken";
import {
  createVideoStats,
  findOneVideoStats,
  updateVideoStats,
} from "../../lib/db/hasura";

const stats = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { videoId, favourited, watched } = req.body;
      const token = req.cookies.token;
      if (!token) {
        return res.status(403).send({});
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.issuer;
      const foundVideoStats = await findOneVideoStats(userId, videoId, token);
      const statsExist = foundVideoStats?.data?.stats?.length > 0;
      const stats = {
        userId,
        videoId,
        watched,
        favourited,
      };
      if (statsExist) {
        // update stats
        const response = await updateVideoStats(stats, token);
        return res.send({ message: "works", decodedToken, response });
      } else {
        // add new stats
        const response = await createVideoStats(stats, token);
        return res.send({ message: "works", decodedToken, response });
      }
    } catch (error) {
      console.error("Error occurred /stats", error);
      return res.status(500).send({ done: false, error: error?.message });
    }
  }
};
export default stats;
