import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Post from "../../components/post/Post";
import ProfileHeader from "@/components/ProfileHeader";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getAllPostsByUser } from "@/lib/data";
import PageWrapper from "@/components/PageWrapper";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  const posts = await getAllPostsByUser(session.user.id);

  return (
    <PageWrapper>
      <ProfileHeader
        name={session.user.name!}
        email={session.user.email!}
        image={session.user.image!}
        id={session.user.id}
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
              content={post.content!}
              author={post?.author!}
              publishedAt={post?.publishedAt}
              authorId={post?.authorId!}
              showFollowButton={false}
            />
          );
        })
      )}
    </PageWrapper>
  );
}
