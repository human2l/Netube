import Head from "next/head";
import SectionCards from "../../components/card/section-cards";
import NavBar from "../../components/nav/navbar";
import { getMyListVideos } from "../../lib/videos";
import styles from "../../styles/MyList.module.css";
import redirectUserCheck from "../../utils/redirectUser";

export const getServerSideProps = async (ctx) => {
  // check if token valid or redirect to login page
  const { userId, token, redirectValue } = await redirectUserCheck(ctx);
  if (!userId) {
    return redirectValue;
  }
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
          <SectionCards title="My List" videos={myListVideos} size="small" />
        </div>
      </main>
    </div>
  );
};

export default MyList;
