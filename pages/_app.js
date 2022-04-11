import { useState, useEffect } from "react";
import { magic } from "../lib/magic-client";
import Router from "next/router";

import "../styles/globals.css";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  //!!!Next.js has bug here, useRouter() can cause infinite loop because it is not memoized. Use "Router" as a temporary solution
  useEffect(() => {
    (async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (!isLoggedIn) {
        Router.push("/login");
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);
    return () => {
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
