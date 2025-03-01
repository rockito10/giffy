import type { HTMLAttributes } from "react";
import { Link } from "wouter";

interface Props extends HTMLAttributes<HTMLAnchorElement> {}

export function HomeLink(props: Props) {
  return (
    <Link to="/">
      <span className="font-bold text-[1.35rem] text-gradient flex items-center gap-1 rounded p-2 transition-transform hover:scale-125">
        GIFFY
      </span>
    </Link>
    {""}
  );
}
