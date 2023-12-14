import PageWrapper from "@/components/PageWrapper";
import { buttonVariants } from "@/components/ui/button";
import { getFavouritePosts, getFollowedUsers, getPostsByFollowedUsers } from "@/lib/data";
import { auth } from "@/auth";
import Post from "@/components/post/Post";
import AuthCheck from "@/components/AuthCheck";
import { redirect } from "next/navigation";
import Link from "next/link";

const FavouritePosts = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const userId = session?.user.id!;

  const favouritePosts = await getFavouritePosts(userId);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4">
        <h1 className="scroll-m-20 text-xl">Your faves</h1>
        <Link
          href="/all-posts"
          className={buttonVariants({ variant: "outline" })}
        >
          All posts
        </Link>
      </div>
        {favouritePosts.length ? (
          favouritePosts.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                content={post.content!}
                author={post?.author!}
                publishedAt={post?.publishedAt}
                authorId={post?.authorId!}
                showFollowButton={false}
              />
            );
          })
        ) : (
          <p>Nothing to see here!</p>
        )}
    </PageWrapper>
  );
};

export default FavouritePosts;
