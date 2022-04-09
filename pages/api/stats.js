import jwt from "jsonwebtoken";
import {
  createVideoStats,
  findOneVideoStats,
  updateVideoStats,
} from "../../lib/db/hasura";

const stats = async (req, res) => {
  try {
    const { videoId } = req.body;
    if (!videoId) {
      return res.send({ message: "invalid query" });
    }
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).send({});
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.issuer;
    const foundVideoStats = await findOneVideoStats(userId, videoId, token);
    const statsExist = foundVideoStats?.length > 0;

    switch (req.method) {
      case "POST":
        const { favourited = 0, watched = true } = req.body;
        const stats = {
          userId,
          videoId,
          watched,
          favourited,
        };
        return await postService(statsExist, stats, token, res);
      case "GET":
        return await getService(statsExist, foundVideoStats, res);
      default:
        return res.status(405).send({});
    }
  } catch (error) {
    console.error("Error occurred /stats", error);
    return res.status(500).send({ done: false, error: error?.message });
  }
};

const postService = async (statsExist, stats, token, res) => {
  if (statsExist) {
    // update stats
    const response = await updateVideoStats(stats, token);
    return res.send({ data: response.data });
  } else {
    // add new stats
    const response = await createVideoStats(stats, token);
    return res.send({ data: response.data });
  }
};

const getService = async (statsExist, foundVideoStats, res) => {
  statsExist ? res.send(foundVideoStats) : res.status(404).send([]);
};

export default stats;
