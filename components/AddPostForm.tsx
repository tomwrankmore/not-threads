"use client";

import { addPost } from "@/lib/actions/actions";
import AddPostButton from "./AddPostButton";
import { toast } from "react-hot-toast";
import { PostSchema } from "@/lib/types";

export default function AddPostForm({ userId }: { userId: string }) {
  async function clientAction(formData: FormData) {
    // Construct new post object to parse for Zod
    const newPost = {
      // title: formData.get("title") as string,
      content: formData.get("content") as string,
      authorId: userId,
    };

    // Client side validation
    // won't go into if block if result.success is truthy.
    const result = PostSchema.safeParse(newPost);
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
    const response = await addPost(result.data);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success(`Success!`);
    }
  }

  return (
    <form action={clientAction} className="mt-8">
      <div className="mb-6">
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="content"
        >
          Content:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="content"
          placeholder="Enter content"
          name="content"
          required
        ></textarea>
      </div>
      <div className="flex items-center justify-end">
        <AddPostButton />
      </div>
    </form>
  );
}
