"use client"
import { useState } from "react";
import { deleteUser } from "@/app/actions/actions";
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
import toast from "react-hot-toast";
import DeleteUserButton from "./DeleteUserButton";
import { Button } from "./ui/button";

export default function DeleteUserForm({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const deleteUserWithId = deleteUser.bind(null, userId);
  
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          Delete profile
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
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <form
            id="deleteUser"
            action={async () => {
              const result = await deleteUserWithId();
              if (result?.error) {
                toast.error(result.error);
              } else {
                toast.success(`Profile deleted!`);
              }
            }}
          >
            <DeleteUserButton handleSubmit={setOpen} />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
