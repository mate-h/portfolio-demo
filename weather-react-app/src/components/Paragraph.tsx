import React, { useEffect, useRef } from "react";

export type ParagraphProps = Partial<{
  top: number;
  bottom: number;
  leading: number;
  className: string;
}>;

export const Paragraph: React.FC<React.PropsWithChildren<ParagraphProps>> = ({
  children,
  top,
  bottom,
  leading,
  className,
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
    <p ref={node} className={["paragraph", className].join(" ")}>
      {children}
    </p>
  );
};
