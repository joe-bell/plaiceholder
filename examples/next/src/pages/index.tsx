import * as React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { cx } from "@/styles";
import { Layout } from "@/components/layout";
import { config } from "@/data/config";

export const getStaticProps = async () => {
  return {
    props: {
      examples: config.examples,
    },
  };
};

const Index: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  examples,
}) => {
  return (
    <Layout>
      <h1 className={cx("font-semibold", "text-3xl", "mt-8")}>Examples</h1>

      <ul className={cx("mt-6")}>
        {examples.map((example) => (
          <li key={example.slug}>
            <Link href={`multiple/${example.slug}`}>
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
