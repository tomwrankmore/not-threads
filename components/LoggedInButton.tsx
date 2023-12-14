"use client";
import { Menu } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import { Button } from "./ui/button";
import Link from "next/link";

const LoggedInButton = () => {
  const { data: session, status } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="icon">
          <UserAvatar
            image={session?.user?.image!}
            name={session?.user?.name!}
          />
        </Button>
        {/* <Button variant="outline" size="icon">
          <Menu />
        </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="w-full">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full text-left">Sign out</button>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Create post</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoggedInButton;
