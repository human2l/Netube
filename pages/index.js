import Head from "next/head";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import styles from "../styles/Home.module.css";
import Card from "../components/card/card";
import SectionCards from "../components/card/section-cards";

export default function Home() {
  const disneyVideos = [
    {
      imgUrl: "/static/clifford.webp",
    },
    {
      imgUrl: "/static/clifford.webp",
    },
    {
      imgUrl: "/static/clifford.webp",
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Netube</title>
        <meta name="description" content="Youtube video in a Netflix layout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar username="somebody" />

      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Disney" videos={disneyVideos} size="medium" />
      </div>
    </div>
  );
}
