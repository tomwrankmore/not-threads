import prisma from "./prisma";

export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true, image: true },
      },
    },
  });
  return post;
}

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });``
  return posts;
}

export async function getAllPostsByUser(id: string) {
  const posts = await prisma.post.findMany({
    where: { authorId: id },
    include: {
      author: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });
  return posts;
}

export async function getUserByID(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}