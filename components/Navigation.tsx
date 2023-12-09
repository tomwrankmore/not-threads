"use client";

import * as React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Home, User, PenSquare, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { UserAvatar } from "./UserAvatar";

export function Navigation() {
  const { data: session, status } = useSession();
  // const initial = Array.from(session?.user?.name!)[0]
  // const initial = "tw";
  // console.log("session?.user?.name!: ", session?.user?.name!);
  return (
    <nav className="max-w-3xl mx-auto flex items-center justify-between p-4 z-[100] relative">
      <div className="flex-1 flex items-center justify-start gap-4">
        <Link href="/profile">
          <UserAvatar
            image={session?.user?.image!}
            name={session?.user?.name!}
          />
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link href="/">
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
        {!session?.user ? (
          <Link
            href={"/api/auth/signin"}
            className={buttonVariants({ variant: "outline" })}
          >
            Sign in
          </Link>
        ) : (
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            className={buttonVariants({ variant: "outline" })}
          >
            Sign out
          </Button>
        )}
      </div>
    </nav>
  );
}
