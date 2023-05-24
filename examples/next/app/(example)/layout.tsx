import Link from "next/link";
import { backBar, backBarLink, icon } from "@plaiceholder/ui";

export default function ExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <nav className={backBar()}>
        <Link href="/" className={backBarLink()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={icon({ size: 4 })}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Examples
        </Link>
      </nav>
    </>
  );
}
