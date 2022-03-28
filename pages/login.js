import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";

const Login = () => {
  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    console.log("loginwith email");
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
          />
          <p className={styles.userMsg}></p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
