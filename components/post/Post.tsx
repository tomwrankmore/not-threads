import UpdateDeletePost from "../UpdateDeletePost";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { PostProps } from "@/lib/types";
import { auth } from "@/auth";
import FollowButton from "@/components/FollowButton";
import FavouriteButton from "../FavouriteButton";
const Post = async ({
  id,
  content,
  author,
  publishedAt,
  authorId,
  showFollowButton,
}: PostProps) => {
  const session = await auth();

  const distance = formatDistance(new Date(publishedAt), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="border-t py-6">
      <div className="flex gap-4 items-start">
        <div className="relative h-8 w-8">
          <Link
            href={
              session?.user.id != authorId
                ? `/user-profile/${authorId}`
                : "/profile"
            }
          >
            <Image
              src={author?.image!}
              alt={author?.name!}
              className="inline-block rounded-full transition hover:scale-105"
              fill
            />
          </Link>
        </div>
        <div className="flex-1">
          <h1 className="font-bold mb-2">
            <Link
              href={
                session?.user.id != authorId
                  ? `/user-profile/${authorId}`
                  : "/profile"
              }
              className="hover:underline"
            >
              {author.name}
            </Link>
          </h1>
          <p className="mb-4 text-sm tracking-tight">{content}</p>
        </div>

        <div className="flex items-center justify-between">
          {session?.user.id === authorId && (
            <UpdateDeletePost postId={id} content={content} />
          )}

          {session && session?.user.id != authorId && showFollowButton && (
            <FollowButton targetUserId={authorId} />
          )}
          {session?.user.id != authorId && (
            <FavouriteButton targetPostId={id}/>
          )}
        </div>
      </div>
      <p className="text-xs text-right">
        <Link href={`/single-post/${id}`}>{distance}</Link>
      </p>
    </div>
  );
};

export default Post;
