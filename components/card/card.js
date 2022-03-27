import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./card.module.css";
import { useState } from "react";
import cls from "classnames";

const Card = (props) => {
  const {
    imgUrl = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    size = "medium",
  } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    console.log("error");
    setImgSrc(
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
    );
  };

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{ scale: 1.2 }}
        className={cls(styles.imgMotionWrapper, classMap[size])}
      >
        <Image
          src={imgSrc}
          alt="image"
          layout="fill"
          className={styles.cardImg}
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};
export default Card;
