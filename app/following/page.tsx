import PageWrapper from "@/components/PageWrapper";
import { buttonVariants } from "@/components/ui/button";
import { getFollowedUsers, getPostsByFollowedUsers } from "@/lib/data";
import { auth } from "@/auth";
import Post from "@/components/post/Post";
import AuthCheck from "@/components/AuthCheck";
import { redirect } from "next/navigation";
import Link from "next/link";

const Following = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const id = session?.user.id!;
  const followedUsers = await getFollowedUsers(id);
  const followedUserIds = followedUsers?.following.map(
    (user) => user.followingId
  );

  const postsByFollowedUsers = await getPostsByFollowedUsers(followedUserIds);
  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4">
        <h1 className="scroll-m-20 text-xl">All post by users you are following</h1>
        <Link
          href="/all-posts"
          className={buttonVariants({ variant: "outline" })}
        >
          All posts
        </Link>
      </div>
      <AuthCheck>
        {postsByFollowedUsers.length ? (
          postsByFollowedUsers.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                // title={post.title}
                content={post.content!}
                author={post?.author!}
                publishedAt={post?.publishedAt}
                authorId={post?.authorId!}
              />
            );
          })
        ) : (
          <p>Nothing to see here!</p>
        )}
      </AuthCheck>
    </PageWrapper>
  );
};

export default Following;
