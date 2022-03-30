import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
Modal.setAppElement("#__next");
const Video = () => {
  const router = useRouter();

  return (
    <div>
      {router.query.videoId}
      <Modal
        isOpen={true}
        onRequestClose={() => {
          router.back();
        }}
        overlayClassName={styles.overlay}
        contentLabel="Watch the video"
      >
        <div>Modal body</div>
      </Modal>
    </div>
  );
};
export default Video;
