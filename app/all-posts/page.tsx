import { Suspense } from "react";
import Post from "../../components/post/Post";
import { getAllPosts } from "@/lib/data";
import Loading from "./loading";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main className="max-w-md mx-auto mt-8">
      <div>
        <h1 className="scroll-m-20 text-xl mb-4">All Posts!</h1>
      </div>
      <div className="mb-4">
        <Suspense fallback={<Loading/>}>
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
    </main>
  );
}
