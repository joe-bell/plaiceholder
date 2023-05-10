import fs from "node:fs/promises";
import glob from "glob";
import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const getImages = async (pattern: string) =>
    Promise.all(
      glob.sync(pattern).map(async (file) => {
        const src = file.replace("./public", "");
        const buffer = await fs.readFile(file);

        const { img, ...plaiceholder } = await getPlaiceholder(buffer);

        return { ...plaiceholder, img: { ...img, src } };
      })
    );

  const images = await getImages("./public/assets/images/unsplash/*.{jpg,png}");

  return {
    props: {
      images,
      title: config.examples.pages.svg.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageSVGMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, images }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 3, aspect: "5/7" })}>
      {images.map(({ svg, img }) => (
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
          <Image {...img} alt="Paint Splashes" title="Photo from Unsplash" />
        </li>
      ))}
    </ul>
  </Layout>
);

export default PageSVGMultiple;
