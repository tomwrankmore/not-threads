"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";
import { Button } from "./ui/button";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <>...</>;
  }
  if (status === "authenticated") {
    return (
      <Link href="/profile">
        <UserAvatar image={session?.user?.image!} name={session?.user?.name!} />
      </Link>
    );
  }
  return (
    <Button variant="outline" onClick={() => signIn()}>
      Sign in
    </Button>
  );
}

export function SignOutButton() {
  return (
    <Button variant="outline" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
