import { Suspense } from "react";
import Post from "../../components/post/Post";
import { getAllPosts } from "@/lib/data";
import Loading from "./loading";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <PageWrapper>
      <div>
        <h1 className="scroll-m-20 text-xl mb-4">All Posts!</h1>
        <Link
          href="/following"
          className={buttonVariants({ variant: "outline" })}
        >
          Filter users you follow
        </Link>
      </div>
      <div className="mb-4">
        <Suspense fallback={<Loading />}>
          {posts.map((post, idx) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content!}
                author={post?.author!}
                publishedAt={post?.publishedAt}
                authorId={post?.authorId!}
              />
            );
          })}
        </Suspense>
      </div>
    </PageWrapper>
  );
}
