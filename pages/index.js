import Head from "next/head";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import styles from "../styles/Home.module.css";
import SectionCards from "../components/card/section-cards";
import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "../lib/videos";
import { verifyToken } from "../lib/utils";

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.token;
  const userId = await verifyToken(token);
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
      watchItAgainVideos,
    },
  };
};

export default function Home(props) {
  const {
    disneyVideos,
    productivityVideos,
    travelVideos,
    popularVideos,
    watchItAgainVideos,
  } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>Netube</title>
        <meta name="description" content="Youtube video in a Netflix layout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar />
        {/* TODO change videoId to real Id */}
        <Banner
          videoId="mYfJxlgR2jw"
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          {watchItAgainVideos && (
            <SectionCards
              title="Watch it again"
              videos={watchItAgainVideos}
              size="small"
            />
          )}
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
