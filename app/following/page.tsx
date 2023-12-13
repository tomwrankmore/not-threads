import PageWrapper from "@/components/PageWrapper";
import { buttonVariants } from "@/components/ui/button";
import { getFollowedUsers, getPostsByFollowedUsers } from "@/lib/data";
import { auth } from "@/auth";
import Post from "@/components/post/Post";
import AuthCheck from "@/components/AuthCheck";
import { redirect } from "next/navigation";

const Following = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/following");
  }

  const id = session?.user.id!;
  const followedUsers = await getFollowedUsers(id);
  const followedUserIds = followedUsers?.following.map(
    (user) => user.followingId
  );

  const postsByFollowedUsers = await getPostsByFollowedUsers(followedUserIds);
  return (
    <PageWrapper>
      <h1>Posts by users you follow:</h1>
      <AuthCheck>
        {postsByFollowedUsers.length ? (
          postsByFollowedUsers.map((post) => {
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
          })
        ) : (
          <p>Nothing to see here!</p>
        )}
      </AuthCheck>
      
    </PageWrapper>
  );
};

export default Following;
