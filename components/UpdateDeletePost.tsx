"use client";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeletePostForm from "./DeletePostForm";
import EditPostForm from "./EditPostForm";

type UpdateDeletePost = {
  postId: string;
  content: string;
}

const UpdateDeletePost = ({ postId, content }: UpdateDeletePost) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openEditAlert, setOpenEditAlert] = useState(false);

  return (
    <>
      <DeletePostForm
        postId={postId}
        openDeleteAlert={openDeleteAlert}
        setOpenDeleteAlert={setOpenDeleteAlert}
      />

      <EditPostForm
        postId={postId}
        openEditAlert={openEditAlert}
        setOpenEditAlert={setOpenEditAlert}
        // title={title}
        content={content}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenDeleteAlert(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
              {/* <DropdownMenuShortcut>⌘D</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenEditAlert(true)}>
              <Edit2 className="mr-2 h-4 w-4" />
              <span>Edit</span>
              {/* <DropdownMenuShortcut>⌘E</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UpdateDeletePost;
