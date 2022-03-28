import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";

const Login = () => {
  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    console.log("loginwith email");
  };
  return (
    <>
      <Head>
        <title>Netube SignIn</title>
      </Head>
      <div className={styles.headerWrapper}>
        <header>
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
          <main className={styles.main}>
            <div className={styles.mainWrrapper}>
              <h1>Sign In</h1>
              <input
                type="text"
                placeholder="Email address"
                className={styles.emailInput}
              />
              <p className={styles.userMsg}></p>
              <button onClick={handleLoginWithEmail}>Sign In</button>
            </div>
          </main>
        </header>
      </div>
    </>
  );
};

export default Login;
