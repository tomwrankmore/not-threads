import { z } from "zod";

export const PostSchema = z.object({
  authorId: z.string(),
  title: z
    .string()
    .trim()
    .min(3, {
      message: "Title must be at least three character",
    })
    .max(100, {
      message: "Title is too long, 100 characters max.",
    }),
  content: z
    .string()
    .trim()
    .min(10, {
      message: "Content must be at least ten character long",
    })
    .max(500, {
      message: "Content is too long, max 500 characters.",
    }),
});

export const UpdatePostSchema = z.object({
  postId: z.string(),
  content: z
    .string()
    .trim()
    .min(10, {
      message: "Content must be at least ten character long",
    })
    .max(500, {
      message: "Content is too long, max 500 characters.",
    }),
});

// useful typing:
export type Post = z.infer<typeof PostSchema>;

export type PostProps = {
  id: string;
  title: string;
  content: string;
  author: { name: string | null; image: string | null };
  publishedAt: Date;
  authorId: string;
};
