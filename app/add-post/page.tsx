import AddPostForm from "../../components/AddPostForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AddPost() {
  const session = await auth();
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/add-post')
  }

  return (
    <main className="max-w-md mx-auto mt-8">
      <h1>Add post</h1>
      <p className="text-xs">You are logged in as: {session?.user?.name}</p>
      <AddPostForm userId={session.user.id} />
    </main>
  );
}