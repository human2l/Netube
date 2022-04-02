import { magicAdmin } from "../../lib/magic";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : "";
      // invoke Magic
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      console.log({ metadata });

      // create jwt

      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET_KEY
      );
      console.log({ token });

      return res.send({ done: true });
    } catch (error) {
      console.log("Something went wrong logging in", error);
      return res.status(500).send({ done: false });
    }
  }
  return res.send({ done: false });
};
export default login;
