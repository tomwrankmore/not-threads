import Post from "@/components/post/Post";
import ProfileHeader from "@/components/ProfileHeader";
import { getAllPostsByUser, getUserByID } from "@/lib/data";

const UserProfile = async ({ params }: { params: { id: string } }) => {
  const user = await getUserByID(params.id);
  const posts = await getAllPostsByUser(params.id);

  return (
    <main className="max-w-md mx-auto mt-8">
      <ProfileHeader
        name={user?.name!}
        email={user?.email!}
        image={user?.image!}
        id={user?.id!}
      />
      {posts.map((post, idx) => {
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
      })}
    </main>
  );
};

export default UserProfile;
