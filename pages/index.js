import Head from "next/head";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import styles from "../styles/Home.module.css";
import Card from "../components/card/card";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netube</title>
        <meta name="description" content="Youtube video in a Netflix layout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar username="somebody" />

      {/* <Navbar /> */}
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />

      <Card imgUrl="/static/clifford.webp" size="large" />
      <Card imgUrl="/static/clifford.webp" size="medium" />
      <Card imgUrl="/static/clifford.webp" size="small" />
    </div>
  );
}
