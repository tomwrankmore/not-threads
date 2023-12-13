import PageWrapper from "@/components/PageWrapper";
import { buttonVariants } from "@/components/ui/button";
import { getFollowedUsers, getPostsByFollowedUsers } from "@/lib/data";
import { auth } from "@/auth";
import Post from "@/components/post/Post";

const Following = async () => {
  const session = await auth();
  const id = session?.user.id!;
  const followedUsers = await getFollowedUsers(id);
  const followedUserIds = followedUsers?.following.map(
    (user) => user.followingId
  );

  const postsByFollowedUsers = await getPostsByFollowedUsers(followedUserIds);
  return (
    <PageWrapper>
      <h1>Posts by users you follow:</h1>
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
    </PageWrapper>
  );
};

export default Following;
