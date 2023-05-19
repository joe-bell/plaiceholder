import {
  article,
  articleContent,
  articleHeader,
  articleHeaderSubtitle,
  articleHeaderTitle,
} from "@plaiceholder/ui";

export default function Article({
  children,
  title,
  subtitle,
  variant,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  variant: "home" | "example";
}) {
  return (
    <article className={article()}>
      <header className={articleHeader()}>
        <h1
          className={articleHeaderTitle({
            size: ({ home: "alpha", example: "beta" } as const)[variant],
          })}
        >
          {title}
        </h1>
        <p className={articleHeaderSubtitle()}>{subtitle}</p>
      </header>
      <div className={articleContent()}>{children}</div>
    </article>
  );
}
