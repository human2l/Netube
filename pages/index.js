import Head from "next/head";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import styles from "../styles/Home.module.css";
import Card from "../components/card/card";
import SectionCards from "../components/card/section-cards";
import { getVideos } from "../lib/videos";

export const getServerSideProps = async () => {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  // const popularVideos = await getVideos("disney trailer");

  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      // popularVideos
    },
  };
};

export default function Home(props) {
  const { disneyVideos, productivityVideos, travelVideos, popularVideos } =
    props;
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
        <SectionCards title="Travel" videos={travelVideos} size="small" />
        <SectionCards
          title="Productivity"
          videos={productivityVideos}
          size="medium"
        />
        <SectionCards title="Popular" videos={[]} size="small" />
      </div>
    </div>
  );
}
