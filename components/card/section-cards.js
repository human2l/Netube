import Card from "./card";
import styles from "./section-cards.module.css";
import Link from "next/link";
import cls from "classnames";

const SectionCards = (props) => {
  const { title, videos = [], size, wrap = false, shouldScale = true } = props;
  if (videos.length === 0) {
    return (
      <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <h3>No video found</h3>
      </section>
    );
  }
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, wrap && styles.wrap)}>
        {videos.map((video, index) => {
          return (
            <Link href={`/video/${video.id}`} key={video.id}>
              <a>
                <Card
                  id={index}
                  videoId={video.id}
                  imgUrl={video.imgUrl}
                  size={size}
                  shouldScale={shouldScale}
                />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default SectionCards;
