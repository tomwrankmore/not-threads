import Post from "@/components/post/Post";
import { getPostById } from "@/lib/data";

type Params = {
  id: string;
};

export default async function SinglePost({ params }: { params: Params }) {
  const post = await getPostById(params.id);
  return (
    <main className="max-w-md mx-auto mt-8">
      <Post
        id={post?.id!}
        // title={post?.title!}
        content={post?.content!}
        author={post?.author!}
        key={post?.id}
        authorId={post?.authorId!}
        publishedAt={post?.publishedAt!}
        showFollowButton={false}
      />
    </main>
  );
}
