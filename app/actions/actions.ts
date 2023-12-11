"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { PostSchema } from "@/lib/types";

export const addPost = async (newPost: unknown) => {
  // Server side Zod validation, parse the object passed from the client.
  const result = PostSchema.safeParse(newPost);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  try {
    await prisma.post.create({
      data: {
        title: result.data.title as string,
        content: result.data.content as string,
        published: true,
        authorId: result.data.authorId
      },
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  // Use this getErrorMessage util fn because you don't really know what the error will be and Typescript will complain if you try return error.message.

  revalidatePath("/");
  redirect("/");
};

export const deletePost = async (id: string) => {
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  revalidatePath("/");
  redirect("/");
};


export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {id},
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  revalidatePath("/");
  redirect("/");
}