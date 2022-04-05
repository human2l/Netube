const stats = async (req, res) => {
  if (req.method === "POST") {
    res.send({ message: "works" });
  }
};
export default stats;
