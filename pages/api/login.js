import { magicAdmin } from "../../lib/magic";

const login = async (req, res) => {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : "";
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      console.log({ metadata });

      return res.send({ done: true });
    } catch (error) {
      console.log("Something went wrong logging in", error);
      return res.status(500).send({ done: false });
    }
  }
  return res.send({ done: false });
};
export default login;
