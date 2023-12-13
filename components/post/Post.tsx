import UpdateDeletePost from "../UpdateDeletePost";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { PostProps } from "@/lib/types";
import { auth } from "@/auth";

const Post = async ({
  id,
  title,
  content,
  author,
  publishedAt,
  authorId,
}: PostProps) => {
  const session = await auth();

  const distance = formatDistance(new Date(publishedAt), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="border-t py-6">
      <div className="flex gap-4 ">
        <div className="relative h-8 w-8">
          <Link href={session?.user.id != authorId ? `/user-profile/${authorId}` : '/profile'}>
            <Image
              src={author?.image!}
              alt={author?.name!}
              className="inline-block rounded-full"
              fill
            />
          </Link>
        </div>
        <div className="flex-1">
          <h1 className="font-bold mb-2">
          <Link href={session?.user.id != authorId ? `/user-profile/${authorId}` : '/profile'}>{author.name}</Link>
          </h1>
          <p className="mb-4 text-sm tracking-tight">{content}</p>
        </div>
        {session?.user.id === authorId && <UpdateDeletePost postId={id} title={title} content={content} />}
      </div>
      <p className="text-xs text-right">
        <Link href={`/single-post/${id}`}>{distance}</Link>
      </p>
    </div>
  );
};

export default Post;
