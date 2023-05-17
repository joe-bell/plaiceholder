import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const getImage = async (src: string) => {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return { ...plaiceholder, img: { src, height, width } };
  };

  const { svg, img } = await getImage(
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80"
  );

  return {
    props: {
      img: {
        ...img,
        alt: "Snowy mountain peaks",
        title: "Photo from Unsplash",
      },
      svg,
      title: config.examples.pages.svg.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageSVGSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, img, svg }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 2 })}>
      <li key={img.src} className={imageListItem()}>
        {React.createElement(
          svg[0],
          {
            ...svg[1],
            style: {
              ...svg[1].style,
              transform: ["scale(1.5)", svg[1].style.transform].join(" "),
              filter: "blur(40px)",
            },
            className: "z-[-1]",
          },
          svg[2].map((child) =>
            React.createElement(child[0], {
              key: [child[1].x, child[1].y].join(","),
              ...child[1],
            })
          )
        )}
        <Image {...img} />
      </li>
    </ul>
  </Layout>
);

export default PageSVGSingle;
