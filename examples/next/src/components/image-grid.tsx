import { cx } from "@/styles";

export interface IImageGridProps {
  columns?: 2 | 3;
}

export const ImageGrid: React.FC<IImageGridProps> = ({
  columns = 3,
  ...props
}) => (
  <ul
    className={cx(
      "grid",
      "grid-cols-1",
      [2, 3].includes(columns) && "sm:grid-cols-2",
      [3].includes(columns) && "md:grid-cols-3",
      "gap-4",
      "mt-8"
    )}
    {...props}
  />
);

export const ImageGridItem = (props) => (
  <li
    className={cx(
      "relative",
      "block",
      "overflow-hidden",
      // See src/styles/index.css
      "next-image"
    )}
    {...props}
  />
);
