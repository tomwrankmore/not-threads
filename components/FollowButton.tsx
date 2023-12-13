
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Button } from "./ui/button";
import FollowClient from "./FollowClient";

const FollowButton = async ({ targetUserId }: { targetUserId: string }) => {
  const session = await auth();

  const currentUserId = await prisma.user
    .findFirst({ where: { email: session?.user?.email! } })
    .then((user) => user?.id!);

  console.log("currentUserId: ", currentUserId);
  console.log("targetUserId: ", targetUserId);
  const isFollowing = await prisma.follows.findFirst({
    where: { followerId: currentUserId, followingId: targetUserId },
  });

  console.log("isFollowing: ", !!isFollowing);
  return <FollowClient currentUserId={currentUserId} targetUserId={targetUserId} isFollowing={!!isFollowing} />;
  };

export default FollowButton;
