import {
  createVideoStats,
  findOneVideoStats,
  updateVideoStats,
} from "../../lib/db/hasura";
import { verifyToken } from "../../lib/utils";

const stats = async (req, res) => {
  try {
    const inputParams = req.method === "GET" ? req.query : req.body;
    const { videoId } = inputParams;
    if (!videoId) {
      return res.send({ message: "invalid query" });
    }
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).send({});
    }

    const userId = await verifyToken(token);

    const foundVideoStats = await findOneVideoStats(userId, videoId, token);

    switch (req.method) {
      case "POST":
        const { favourited = 0, watched = true } = inputParams;
        const stats = {
          userId,
          videoId,
          watched,
          favourited,
        };
        return await postService(foundVideoStats, stats, token, res);
      case "GET":
        return await getService(foundVideoStats, res);
      default:
        // method not allowed
        return res.status(405).send({});
    }
  } catch (error) {
    console.error("Error occurred /stats", error);
    return res.status(500).send({ done: false, error: error?.message });
  }
};

const postService = async (foundVideoStats, stats, token, res) => {
  if (foundVideoStats) {
    // update stats
    const response = await updateVideoStats(stats, token);
    return res.send({ data: response.data });
  } else {
    // add new stats
    const response = await createVideoStats(stats, token);
    return res.send({ data: response.data });
  }
};

const getService = async (foundVideoStats, res) => {
  foundVideoStats ? res.send(foundVideoStats) : res.status(404).send({});
};

export default stats;
