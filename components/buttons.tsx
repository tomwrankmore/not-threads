"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
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
    <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
      Sign Out
    </Button>
  );
}
