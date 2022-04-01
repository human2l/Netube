const login = async (req, res) => {
  if (req.method === "POST") {
    try {
      return res.send({ done: true });
    } catch (error) {
      console.log("Something went wrong logging in", error);
      return res.status(500).send({ done: false });
    }
  }
  return res.send({ done: false });
};
export default login;
