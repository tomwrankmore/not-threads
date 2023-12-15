"use client";

import { updatePostContent } from "@/lib/actions/actions";
import { toast } from "react-hot-toast";
import { UpdatePostSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

type EditPostFormProps = {
  postId: string;
  openEditAlert: boolean;
  setOpenEditAlert: React.Dispatch<React.SetStateAction<boolean>>;
  // title: string;
  content: string;
};

export default function EditPostForm({
  postId,
  openEditAlert,
  setOpenEditAlert,
  // title,
  content
}: EditPostFormProps) {
  // const [titleValue, setTitleValue] = useState(title)
  const [contentValue, setContentValue] = useState(content)

  async function clientAction(formData: FormData) {
    // Construct new post object to parse for Zod
    const updatedPost = {
      content: formData.get("content") as string,
      postId: postId,
    };

    // Client side validation
    // won't go into if block if result.success is truthy.
    const result = UpdatePostSchema.safeParse(updatedPost);
    if (!result.success) {
      // output error with Zod
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });
      toast.error(errorMessage);
      return;
    }

    // Fire off server action using parsed data.
    const response = await updatePostContent(result.data);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success(`Success!`);
    }
  }

  return (
    <Dialog open={openEditAlert} onOpenChange={setOpenEditAlert}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={clientAction} className="mt-2" id="editPostForm">
          {/* <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="title">
              Title:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={titleValue}
              name="title"
              onChange={(e)=>setTitleValue(e.target.value)}
            />
          </div> */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="content">
              Content:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              value={contentValue}
              onChange={(e)=>setContentValue(e.target.value)}
              name="content"
              required
            ></textarea>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              form="editPostForm"
              onClick={() => setOpenEditAlert(false)}
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
