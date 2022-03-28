import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import { createMagic } from "../lib/magic-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    setEmail(e.target.value);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setUserMsg("Please enter a valid email");
      return;
    }
    //TODO validation
    // log in a user by their email
    try {
      const magic = createMagic();
      setIsLoading(true);
      const didToken = await magic.auth.loginWithMagicLink({
        email,
      });
      setIsLoading(false);
      if (didToken) {
        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Something went wrong logging in", error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netube SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a href="" className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src={"/static/netube-large.png"}
                alt="Netube logo"
                width="120px"
                height="30px"
              />
            </div>
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
