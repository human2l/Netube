import jwt from "jsonwebtoken";
import {
  createVideoStats,
  findOneVideoStats,
  updateVideoStats,
} from "../../lib/db/hasura";

const stats = async (req, res) => {
  switch (req.method) {
    case "POST":
      return await postService(req, res);
    case "GET":
      return await getService(req, res);
    default:
      return res.status(405).send({});
  }
};

const postService = async (req, res) => {
  try {
    const { videoId, favourited = 0, watched = true } = req.body;
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
    const stats = {
      userId,
      videoId,
      watched,
      favourited,
    };
    if (statsExist) {
      // update stats
      const response = await updateVideoStats(stats, token);
      return res.send({ data: response.data });
    } else {
      // add new stats
      const response = await createVideoStats(stats, token);
      return res.send({ data: response.data });
    }
  } catch (error) {
    console.error("Error occurred /stats", error);
    return res.status(500).send({ done: false, error: error?.message });
  }
};

const getService = async (req, res) => {
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
    statsExist ? res.send(foundVideoStats) : res.status(404).send([]);
  } catch (error) {
    console.error("Error occurred /stats", error);
    return res.status(500).send({ done: false, error: error?.message });
  }
};

export default stats;
