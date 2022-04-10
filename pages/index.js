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

export const getServerSideProps = async () => {
  const userId = "did:ethr:0xCdfe8EF9086736823e3fe751F4239264c459B74a";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweENkZmU4RUY5MDg2NzM2ODIzZTNmZTc1MUY0MjM5MjY0YzQ1OUI3NGEiLCJwdWJsaWNBZGRyZXNzIjoiMHhDZGZlOEVGOTA4NjczNjgyM2UzZmU3NTFGNDIzOTI2NGM0NTlCNzRhIiwiZW1haWwiOiJodW1hbjJsa2FpQGdtYWlsLmNvbSIsIm9hdXRoUHJvdmlkZXIiOm51bGwsInBob25lTnVtYmVyIjpudWxsLCJpYXQiOjE2NDk1NzI0OTYsImV4cCI6MTY1MDE3NzM1NiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4Q2RmZThFRjkwODY3MzY4MjNlM2ZlNzUxRjQyMzkyNjRjNDU5Qjc0YSJ9fQ.w-t9nf53NcVxmRBJvrxWu9MbOY2vfmDsn904m0-KAqM";
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  console.log(watchItAgainVideos);
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
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
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
