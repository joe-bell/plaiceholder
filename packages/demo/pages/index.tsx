import * as React from "react";
import { GetStaticProps } from "next";
import { getBase64 } from "next-placeholder";
import { getBlurhash } from "next-blurhash";
import { BlurhashCanvas } from "react-blurhash";
import Image from "next/image";

type DemoProps = {
  img: Record<"alt" | "href" | "title" | "base64" | "hash" | "src", string>;
};

export const getStaticProps: GetStaticProps<DemoProps> = async () => {
  const src = "/keila-joa.jpg";
  const base64 = await getBase64(src);
  const hash = await getBlurhash(src);

  return {
    props: {
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

const Index: React.FC<DemoProps> = ({ img }) => (
  <main className=" max-w-4xl mx-auto px-4 mt-6 pb-20 text-gray-800">
    <h1 className="font-bold text-4xl">next-placeholder</h1>

    <p className="mt-3">
      <a
        className="text-xl text-blue-700 hover:underline"
        href="https://github.com/joe-bell/next-blurhash"
      >
        See the README
      </a>
    </p>

    <h3 className="font-mono text-2xl mt-6">getBase64(&lt;image-path&gt;)</h3>

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

    <hr className="mt-8" />

    <h2 className="font-bold text-3xl mt-6">next-blurhash</h2>
    <h3 className="font-mono text-2xl mt-4">getBlurhash(&lt;image-path&gt;)</h3>

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
  </main>
);

export default Index;
