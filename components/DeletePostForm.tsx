"use client";
import React from "react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actions/actions";

type DeletePostFormProps = {
  postId: string;
  openDeleteAlert: boolean;
  setOpenDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeletePostForm = ({
  postId,
  openDeleteAlert,
  setOpenDeleteAlert,
}: DeletePostFormProps) => {
  
  const deletePostWithId = deletePost.bind(null, postId);

  return (
    <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to DELETE this post?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form
            id="deletePost"
            action={async () => {
              const result = await deletePostWithId();
              if (result?.error) {
                toast.error(result.error);
              } else {
                toast.success(`Post deleted!`);
                // setOpenAlert(false);
              }
            }}
          >
            <AlertDialogAction type="submit" form="deletePost">
              Yes, delete
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostForm;
