import { removeTokenFromCookie } from "../../lib/cookies";
import { magicAdmin } from "../../lib/magic";

const logout = async (req, res) => {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : "";
      await magicAdmin.users.logoutByToken(didToken);
      removeTokenFromCookie(res);
      res.writeHead(302, { Location: "/login" });
      return res.end();
    } catch (error) {
      console.error("Error occured while logging out magic user", error);
      return res.status(401).json({ message: "User is not logged in" });
    }
  }
};

export default logout;
