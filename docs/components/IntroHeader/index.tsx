import React from "react";
import { cx } from "class-variance-authority";
import styles from "./styles.module.css";

interface IntroHeaderProps {
  headline: string;
  tagline: string;
}

function IntroHeader({ headline, tagline }: IntroHeaderProps) {
  return (
    <header className={cx("nx-mt-4", styles.container)}>
      <p
        className={cx(
          "nx-text-4xl nx-font-bold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100",
          styles.headline
        )}
      >
        {headline}
      </p>
      <p className={styles.tagline}>{tagline}</p>
    </header>
  );
}

export default IntroHeader;
