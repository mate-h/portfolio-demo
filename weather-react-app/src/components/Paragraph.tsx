import React, { useEffect, useRef } from "react";

export type ParagraphProps = Partial<{
  top: number;
  bottom: number;
  leading: number;
  className: string;
  onClick: (ev: React.MouseEvent<HTMLParagraphElement>) => void;
}>;

export const Paragraph: React.FC<React.PropsWithChildren<ParagraphProps>> = ({
  children,
  top,
  bottom,
  leading,
  className,
  onClick,
}) => {
  const node = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const e = node.current;
    if (e) {
      if (top) e.style.setProperty("--top", `${top}`);
      if (bottom) e.style.setProperty("--bottom", `${bottom}`);
      if (leading) e.style.setProperty("--leading", `${leading}`);
    }
  });
  return (
    <p
      onClick={onClick}
      ref={node}
      className={["paragraph", className].join(" ")}
    >
      {children}
    </p>
  );
};
