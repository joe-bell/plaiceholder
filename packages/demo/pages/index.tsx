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
  <main className="max-w-4xl mx-auto px-4 mt-6 pb-6 text-gray-800">
    <h1 className="font-bold text-4xl text-center">next-blurhash</h1>

    <section className="text-center mx-auto mt-2 pb-6">
      <a
        className="text-blue-700 hover:underline"
        href="https://github.com/joe-bell/next-blurhash"
      >
        See the README
      </a>
    </section>

    <a href="https://instagram.com/joebell">
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
    </a>
  </main>
);

export default Index;
