"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { PostSchema, UpdatePostSchema } from "@/lib/types";

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
        title: '',
        content: result.data.content as string,
        published: true,
        authorId: result.data.authorId,
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

export const updatePostContent = async (updatedPost: unknown) => {
  // Server side Zod validation, parse the object passed from the client.
  const result = UpdatePostSchema.safeParse(updatedPost);
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
    await prisma.post.update({
      where: { id: result.data.postId },
      data: {
        content: result.data.content,
      },
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  revalidatePath("/all-posts");
  // redirect("/all-posts");
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

  revalidatePath("/profile");
  redirect("/profile");
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
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

export const followUser = async (
  targetUserId: string,
  currentUserId: string
) => {
  try {
    await prisma.follows.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  // revalidatePath(`/user-profile/${targetUserId}`);
  // revalidatePath(`/all-posts/`);
  // redirect(`/user-profile/${targetUserId}`);
};

export const unfollowUser = async (
  targetUserId: string,
  currentUserId: string
) => {
  try {
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        }
      }
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  // revalidatePath(`/user-profile/${targetUserId}`);
  // redirect(`/user-profile/${targetUserId}`);
};

export const addFavourite = async (
  postId: string,
  userId: string
) => {
  try {
    await prisma.favorite.create({
      data: {
        userId,
        postId,
      },
    })
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export const removeFavourite = async (
  postId: string,
  userId: string
) => {
  try {
    await prisma.favorite.delete({
      where: {
        userId_postId: {
          postId,
          userId
        }
      },
    })
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
}