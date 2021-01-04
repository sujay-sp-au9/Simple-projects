import React from "react";
import Link from "./Link";

export default function Header() {
  return (
    <div className="ui secondary pointing menu">
      <Link href="/" text="Accordion" className="item" />
      <Link href="/search" text="Search" className="item" />
      <Link href="/dropdown" text="Dropdown" className="item" />
      <Link href="/translate" text="Translate" className="item" />
    </div>
  );
}
