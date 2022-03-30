import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import cls from "classnames";
Modal.setAppElement("#__next");
const Video = () => {
  const router = useRouter();
  const video = {
    title: "title",
    publishTime: "pubtime",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, iste facilis consequuntur quo hic quasi nobis totam minima nisi. Saepe praesentium ab nesciunt aliquid dignissimos inventore recusandae sint autem vel! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta atque voluptates exercitationem voluptatibus dolores aspernatur! Minima eaque doloribus eos maxime esse ex, illo obcaecati incidunt dolore iusto reiciendis magni quae! Lorem ipsum dolor sit amet consectetur, adipisicing elit. At consequuntur facere error iure ad similique dicta accusantium, omnis enim sapiente reprehenderit repellat quaerat quo rem ea? Quis delectus laudantium molestiae!",
    channelTitle: "channelTitle",
    viewCount: 100,
  };
  const { title, publishTime, description, channelTitle, viewCount } = video;

  const videoId = router.query.videoId;
  return (
    <div className={styles.container}>
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
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1&disablekb=1`}
          frameBorder="0"
        />
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
