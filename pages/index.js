import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner/banner";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netube</title>
        <meta name="description" content="Youtube video in a Netflix layout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Netube</h1>

      {/* <Navbar /> */}
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />

      {/* <Card /> */}
    </div>
  );
}
