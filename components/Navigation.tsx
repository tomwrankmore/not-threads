"use client";

import * as React from "react";
import Link from "next/link";
import { Home, User, PenSquare, Search } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

import AuthCheck from "@/components/AuthCheck";
import { SignInButton, SignOutButton } from "./buttons";

export function Navigation() {
  return (
    <nav className="max-w-3xl mx-auto flex items-center justify-between p-4 z-[100] relative">
      <div className="flex-1 flex items-center justify-start gap-4">
        <ul className="flex gap-4">
          <li>
            <Link href="/all-posts">
              <Home />
            </Link>
          </li>
          <li>
            <Link href="/add-post">
              <PenSquare />
            </Link>
          </li>
          <li>
            <Search />
          </li>
        </ul>
      </div>
      <div className="flex-1 flex items-center justify-end gap-4">
        <ModeToggle />
        <AuthCheck>
          <SignOutButton />
        </AuthCheck>
        <SignInButton />
      </div>
    </nav>
  );
}
