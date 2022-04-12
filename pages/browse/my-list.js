import Head from "next/head";
import SectionCards from "../../components/card/section-cards";
import NavBar from "../../components/nav/navbar";
import { verifyToken } from "../../lib/utils";
import { getMyListVideos } from "../../lib/videos";
import styles from "../../styles/MyList.module.css";

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.token;
  const userId = await verifyToken(token);
  const myListVideos = await getMyListVideos(userId, token);

  return {
    props: {
      myListVideos,
    },
  };
};

const MyList = (props) => {
  const { myListVideos } = props;
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>

      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            wrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
