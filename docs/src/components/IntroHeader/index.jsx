import React from "react";
import styles from "./styles.module.css";

/**
 * @param {Record<'headline' | 'tagline', string>} props
 */
function IntroHeader({ headline, tagline, link }) {
  return (
    <header className={styles.container}>
      <p className={styles.headline}>{headline}</p>
      <p className={styles.tagline}>{tagline}</p>
    </header>
  );
}

export default IntroHeader;
