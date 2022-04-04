import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import cls from "classnames";
import { getVideoById } from "../../lib/videos";
import Navbar from "../../components/nav/navbar";
import Like from "../../components/icons/like-icon";
import DisLike from "../../components/icons/dislike-icon";

Modal.setAppElement("#__next");

export const getStaticProps = async (ctx) => {
  const videoId = ctx.params.videoId;
  const videoArray = await getVideoById(videoId);
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  };
};

export const getStaticPaths = async () => {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((videoId) => {
    return {
      params: { videoId },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

const Video = ({ video }) => {
  const router = useRouter();
  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount },
  } = video;

  const videoId = router.query.videoId;
  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        className={styles.modal}
        isOpen={true}
        onRequestClose={() => {
          router.back();
        }}
        overlayClassName={styles.overlay}
        contentLabel="Watch the video"
      >
        <iframe
          className={styles.videoPlayer}
          id="ytplayer"
          type="text/html"
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&rel=1&disablekb=1`}
          frameBorder="0"
        />
        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button>
              <div className={styles.btnWrapper}>
                <Like />
              </div>
            </button>
          </div>

          <button>
            <div className={styles.btnWrapper}>
              <DisLike />
            </div>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.info, styles.infoWrapper)}>
                <span className={styles.infoLabel}>Cast: </span>
                <span className={styles.infoContent}>{channelTitle}</span>
              </p>
              <p className={cls(styles.info, styles.infoWrapper)}>
                <span className={styles.infoLabel}>View Count: </span>
                <span className={styles.infoContent}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Video;
