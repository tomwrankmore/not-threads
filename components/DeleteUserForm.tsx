"use client";
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

type DeleteUserFormProps = {
  userId: string;
  openDeleteAlert: boolean;
  setOpenDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteUserForm({
  userId,
  openDeleteAlert,
  setOpenDeleteAlert,
}: DeleteUserFormProps) {
  const deleteUserWithId = deleteUser.bind(null, userId);

  return (
    <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to DELETE your profile?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
            <DeleteUserButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
