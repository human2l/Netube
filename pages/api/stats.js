import jwt from "jsonwebtoken";
const stats = async (req, res) => {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(403).send({});
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log({ decoded });
      res.send({ message: "works", decoded });
    } catch (error) {
      console.error("Error occurred /stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }
  }
};
export default stats;
