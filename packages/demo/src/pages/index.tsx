import * as React from "react";
import { GetStaticProps } from "next";
import { getStaticBlurhash } from "next-blurhash";
import { BlurhashCanvas } from "react-blurhash";
import Image from "next/image";

type DemoProps = Record<"imgHash" | "imgSrc", string>;

export const getStaticProps: GetStaticProps<DemoProps> = async () => {
  const imgSrc = "/keila-joa.jpg";
  const imgHash = await getStaticBlurhash(imgSrc);

  return {
    props: {
      imgHash,
      imgSrc,
    },
  };
};

const Index: React.FC<DemoProps> = ({ imgHash, imgSrc }) => (
  <main>
    <div style={{ position: "relative" }}>
      <BlurhashCanvas
        hash={imgHash}
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
      <Image src={imgSrc} width={4032} height={3024} />
    </div>
  </main>
);

export default Index;
