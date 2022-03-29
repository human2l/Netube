import { useEffect } from "react";
import { magic } from "../lib/magic-client";
import Router from "next/router";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  //!!!Next.js has bug here, useRouter() can cause infinite loop because it is not memoized. Use "Router" as a temporary solution
  useEffect(() => {
    const asyncFn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      isLoggedIn ? Router.push("/") : Router.push("/login");
    };
    asyncFn();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
