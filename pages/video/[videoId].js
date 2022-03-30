import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
Modal.setAppElement("#__next");
const Video = () => {
  const router = useRouter();
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
        ></iframe>
      </Modal>
    </div>
  );
};
export default Video;
