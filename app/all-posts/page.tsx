import { Suspense } from "react";
import Post from "../../components/post/Post";
import { getAllPosts } from "@/lib/data";
import Loading from "./loading";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import AuthCheck from "@/components/AuthCheck";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <PageWrapper>
      <p className="text-sm mb-8 text-gray-400 p-4 border">
        This is a Next14 project that utilises technologies like
        Prisma/PostgresSQL, AuthJS, Zod and shadcn component library. A threads
        style app with the ability to login, create, edit, delete posts, follow
        other users and favourite their posts.
      </p>

      <div className="flex items-center justify-between mb-4">
        <h1 className="scroll-m-20 text-xl">All Posts!</h1>

        <AuthCheck>
          <div className="flex gap-4">
            <Link
              href="/following"
              className={buttonVariants({ variant: "ghost" })}
            >
              Following
            </Link>
            <Link
              href="/favourites"
              className={buttonVariants({ variant: "ghost" })}
            >
              Favourites
            </Link>
          </div>
        </AuthCheck>
      </div>
      <div className="mb-4">
        <Suspense fallback={<Loading />}>
          {posts.map((post, idx) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                content={post.content!}
                author={post?.author!}
                publishedAt={post?.publishedAt}
                authorId={post?.authorId!}
                showFollowButton={true}
              />
            );
          })}
        </Suspense>
      </div>
    </PageWrapper>
  );
}
