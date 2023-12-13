"use client";
import { UserAvatar } from "./UserAvatar";
import DeleteUserForm from "@/components/DeleteUserForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import FollowButton from "@/components/FollowButton";

type ProfileHeaderProps = {
  children?: React.ReactNode;
  name: string;
  email: string;
  image: string;
  id: string;
};

const ProfileHeader = ({ children, name, email, image, id }: ProfileHeaderProps) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const pathname = usePathname();
  return (
    <>
      {/* only render if passed is equal to session id. */}
      {pathname === "/profile" && (
        <DeleteUserForm
          userId={id}
          openDeleteAlert={openDeleteAlert}
          setOpenDeleteAlert={setOpenDeleteAlert}
        />
      )}

      <div className="flex justify-between pb-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-xs">{email}</p>
          {children}
        </div>
        <div className="flex justify-between pb-4 mb-4">
          {pathname === "/profile" ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">...</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setOpenDeleteAlert(true)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete Profile</span>
                      {/* <DropdownMenuShortcut>⌘D</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <UserAvatar image={image} name={name} />
            </>
          ) : (
            <UserAvatar image={image} name={name} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
