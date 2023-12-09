"use client";
import { useState } from "react";
import { deletePost } from "@/app/actions/actions";
import DeletePostButton from "./DeletePostButton";
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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const DeletePostForm = ({ postId }: { postId: string }) => {
  const [open, setOpen] = useState(false)
  const deletePostWithId = deletePost.bind(null, postId);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <form
          id="deletePost"
            action={async () => {
              const result = await deletePostWithId();
              if (result?.error) {
                toast.error(result.error);
              } else {
                toast.success(`Post deleted!`);
              }
            }}
          >
            <DeletePostButton handleSubmit={setOpen} />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostForm;
