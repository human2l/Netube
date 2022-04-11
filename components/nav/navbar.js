import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { magic } from "../../lib/magic-client";

const NavBar = () => {
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [didToken, setDidToken] = useState("");
  const router = useRouter();
  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      response.ok && router.push("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  useEffect(() => {
    (async () => {
      // Assumes a user is already logged in
      try {
        const { email } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();
        if (!email) {
          router.push("/login");
          return;
        }
        setUsername(email);
        setDidToken(didToken);
      } catch (err) {
        console.error("Error retrieving email", err);
      }
    })();
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} onClick={handleOnClickHome}>
          <div className={styles.logoWrapper}>
            <Image
              src={"/static/netube-large.png"}
              alt="Netube logo"
              width="120px"
              height="30px"
            />
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src={"/static/expand_more.svg"}
                alt="Expand dropdown"
                width="24px"
                height="24px"
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a onClick={handleSignout} className={styles.linkName}>
                    Sign out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
export default NavBar;
