import { verifyToken } from "../lib/utils";

const redirectUserCheck = async (ctx) => {
  const token = ctx.req.cookies.token;
  const userId = await verifyToken(token);
  if (!userId) {
    return {
      redirectValue: {
        props: {},
        redirect: {
          destination: "/login",
          permanent: false,
        },
      },
    };
  }
  return { userId, token };
};

export default redirectUserCheck;
