import React from "react";
import styles from "./styles.module.css";

/**
 * @param {{ link: Record<'href' | 'label', string> }
 *   & Record<'headline' | 'tagline', string>
 * } props
 */
function IntroHeader({ headline, tagline, link }) {
  return (
    <header className={styles.container}>
      <p className={styles.headline}>{headline}</p>
      <p className={styles.tagline}>{tagline}</p>
      <a className={styles.btn} href={link.href}>
        {link.label}
      </a>
    </header>
  );
}

export default IntroHeader;
