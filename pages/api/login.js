import { magicAdmin } from "../../lib/magic";
import jwt from "jsonwebtoken";
import { isNewUser, createNewUser } from "../../lib/db/hasura";
import { setTokenToCookie } from "../../lib/cookies";

const login = async (req, res) => {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : "";
      console.log(didToken);
      // invoke Magic
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      console.log(metadata);
      // create jwt
      const token = jwt.sign(
        {
          ...metadata,
          /*!!! Hasura hsa a bug when we send the jwt with iat: Date.now() it will gives back an "message: 'Could not verify JWT: JWTIssuedAtFuture'"
          https://community.fly.io/t/hasura-on-fly-firebase-auth-jwtissuedatfuture-error/964
            For now, we just set the iat to 1 minute before now
              */
          //TODO change iat time back to "now()" when hasura fixed bug above
          iat: Math.floor(Date.now() / 1000 - 60),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );
      const isNewUserQuery = await isNewUser(token, metadata.issuer);
      isNewUserQuery && (await createNewUser(token, metadata));
      //set the cookie
      setTokenToCookie(token, res);
      return res.send({ done: true });
    } catch (error) {
      console.error("Something went wrong logging in through api", error);
      return res.status(500).send({ done: false });
    }
  }
  return res.send({ done: false });
};
export default login;
