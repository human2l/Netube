const stats = async (req, res) => {
  if (req.method === "POST") {
    try {
      if (!req.cookies.token) {
        return res.status(403).send({});
      }
      res.send({ message: "works" });
    } catch (error) {
      console.error("Error occurred /stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }
  }
};
export default stats;
