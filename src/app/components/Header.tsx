import React from "react";
import { Connect } from "./Connect";
import Link from "next/link";

export function Header() {
  return (
    <Link href="/">
      <header className="navbar flex justify-between p-6 border-b border-gray-900">
        <h1 className="text-xl font-bold hover:text-gray-500">Supply Mate</h1>
        <div className="flex gap-2">
          <Connect />
        </div>
      </header>
    </Link>
  );
}
