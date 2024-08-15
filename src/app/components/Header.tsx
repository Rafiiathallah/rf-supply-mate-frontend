import React from "react";

import { Connect } from "./Connect";
import Link from "next/link";

export function Header() {
  return (
    <Link href="/">
      <header className="navbar flex justify-between p-4 pt-0">
        <h1 className="text-xl font-bold">Supply Mate</h1>
        <div className="flex gap-2">
          <Connect />
        </div>
      </header>
    </Link>
  );
}
