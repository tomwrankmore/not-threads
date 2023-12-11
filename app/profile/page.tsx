import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Post from "../../components/Post";
import ProfileHeader from "@/components/ProfileHeader";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { getAllPostsByUser } from "@/lib/data";
import DeleteUserForm from "@/components/DeleteUserForm";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  const posts = await getAllPostsByUser(session.user.id);

  return (
    <main className="max-w-md mx-auto mt-8">
      <DeleteUserForm userId={session.user.id} />
      <ProfileHeader
        name={session.user.name!}
        email={session.user.email!}
        image={session.user.image!}
      />
      {!posts.length ? (
        <div className="flex items-center justify-between">
          <p>No posts yet!</p>
          <Link
            href="/add-post"
            className={buttonVariants({ variant: "outline" })}
          >
            Say somethin&apos;
          </Link>
        </div>
      ) : (
        posts.map((post) => {
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
      )}
    </main>
  );
}
