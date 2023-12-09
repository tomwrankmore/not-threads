import Post from "@/components/Post";
import ProfileHeader from "@/components/ProfileHeader";
import { getAllPostsByUser, getUserByID } from "@/lib/data";

const UserProfile = async ({ params }: { params: { id: string } }) => {
  console.log("id: ", params.id);
  const user = await getUserByID(params.id);
  const posts = await getAllPostsByUser(params.id);

  console.log("user: ", user);
  return (
    <main className="max-w-md mx-auto mt-8">
      <ProfileHeader
        name={user?.name!}
        email={user?.email!}
        image={user?.image!}
      />
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
    </main>
  );
};

export default UserProfile;
