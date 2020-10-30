import * as React from "react";
import { GetStaticProps } from "next";
import { getBase64 } from "next-placeholder";
import { getBlurhash } from "next-blurhash";
import { BlurhashCanvas } from "react-blurhash";
import Image from "next/image";
import { IconGitHub, IconTwitter } from "@/components/icons";
import { cx } from "@/styles";

type DemoProps = {
  external: Record<"github" | "twitter", string>;
  img: Record<"alt" | "href" | "title" | "base64" | "hash" | "src", string>;
};

export const getStaticProps: GetStaticProps<DemoProps> = async () => {
  const src = "/keila-joa.jpg";
  const base64 = await getBase64(src);
  const hash = await getBlurhash(src);

  return {
    props: {
      external: {
        github: "https://github.com/joe-bell/next-placeholder",
        twitter: "https://twitter.com/joebell_",
      },
      img: {
        alt: "Keila Joa, Estonia.",
        href: "https://instagram.com/joebell",
        src,
        base64,
        hash,
        title: "© Joe Bell",
      },
    },
  };
};

const Index: React.FC<DemoProps> = ({ external, img }) => (
  <React.Fragment>
    <header
      className={cx(
        "sticky",
        "top-0",
        "bg-white",
        "border-b",
        "border-gray-300",
        "py-4",
        "z-10"
      )}
    >
      <div
        className={cx(
          "c-container",
          "w-full",
          "flex",
          "justify-between",
          "items-center"
        )}
      >
        <h1 className={cx("font-bold", "text-3xl", "text-gray-900")}>
          next-placeholder
        </h1>

        <ul className={cx("flex", "space-x-4")}>
          <li>
            <a href={external.github} className={cx("c-icon-link")}>
              <span className="sr-only">View the GitHub repo</span>
              <IconGitHub />
            </a>
          </li>
          <li>
            <a href={external.twitter} className={cx("c-icon-link")}>
              <span className="sr-only">Contact the author on Twitter</span>
              <IconTwitter />
            </a>
          </li>
        </ul>
      </div>
    </header>
    <main className={cx("c-container", "mt-6", "pb-20", "text-gray-800")}>
      <p className="mt-3">
        <a
          className="text-xl text-blue-700 hover:underline"
          href={external.github}
        >
          See the README <span aria-hidden="true">↗</span>
        </a>
      </p>

      <article className={cx("flex", "flex-row", "-mx-2", "mt-6")}>
        <section className={cx("w-1/2", "px-2")}>
          <h2 className={cx("font-mono", "text-md", "sm:text-xl")}>
            getBase64(&lt;image-path&gt;)
          </h2>

          <a className="block mt-4" href={img.href}>
            {/* For the sake of legibility, this example uses inline styles, but don't
do this in production */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                aria-hidden="true"
                alt=""
                src={img.base64}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "blur(2rem)",
                  transform: "scale(1.2)",
                }}
              />
              <Image
                alt={img.alt}
                title={img.title}
                src={img.src}
                width={4032}
                height={3024}
              />
            </div>
          </a>
        </section>

        <section className={cx("w-1/2", "px-2")}>
          <h2 className={cx("font-mono", "text-md", "sm:text-xl")}>
            getBlurhash(&lt;image-path&gt;)
          </h2>

          <a className="block mt-4" href={img.href}>
            {/* For the sake of legibility, this example uses inline styles, but don't
      do this in production */}
            <div style={{ position: "relative" }}>
              <BlurhashCanvas
                hash={img.hash}
                width={32}
                height={32}
                punch={1}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
              <Image
                alt={img.alt}
                title={img.title}
                src={img.src}
                width={4032}
                height={3024}
              />
            </div>
          </a>
        </section>
      </article>
    </main>
  </React.Fragment>
);

export default Index;
