import PageWrapper from "@/components/PageWrapper";
import { buttonVariants } from "@/components/ui/button";
import { getFollowedUsers, getPostsByFollowedUsers } from "@/lib/data";
import { auth } from "@/auth";
import Post from "@/components/post/Post";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Undo2 } from "lucide-react";

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
        <h1 className="scroll-m-20 text-xl">Latest from users you follow</h1>
        <Link
          href="/all-posts"
          className={buttonVariants({ variant: "ghost" })}
        >
          <span className="mr-2">All posts</span><Undo2 />
        </Link>
      </div>
        {postsByFollowedUsers.length ? (
          postsByFollowedUsers.map((post) => {
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
          })
        ) : (
          <p>Nothing to see here!</p>
        )}
    </PageWrapper>
  );
};

export default Following;
