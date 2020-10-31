import * as React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { cx } from "@/styles";
import { Layout } from "@/components/layout";
import { config } from "@/data/config";

type Examples = typeof config.examples;

interface PageProps {
  examples: Examples;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => ({
  props: {
    examples: config.examples,
  },
});

const Index: React.FC<PageProps> = ({ examples }) => {
  return (
    <Layout>
      <h1 className={cx("font-semibold", "text-3xl")}>Plaiceholder: Next.js</h1>

      <h2 className={cx("font-semibold", "text-2xl", "mt-4")}>Examples</h2>

      <ul className={cx("mt-2")}>
        {examples.map((example) => (
          <li key={example.slug}>
            <Link href={`example/${example.slug}`}>
              <a className={cx("underline", "text-blue-700")}>
                {example.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Index;
