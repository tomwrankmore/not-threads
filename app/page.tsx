import Post from "../components/Post";
import { getPosts } from "@/lib/data";

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="max-w-md mx-auto mt-8">
      <div>
        <h1 className="scroll-m-20 text-xl font-bold mb-4">All Posts!</h1>
      </div>
      <div className="mb-4">
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
      </div>
    </main>
  );
}
