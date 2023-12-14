import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import FavouriteButtonClient from "./FavouriteButtonClient";
import { Button } from "./ui/button";

const FavouriteButton = async  ({targetPostId}:{targetPostId:string}) => {
  const session = await auth();

  const currentUserId = session?.user?.id!

  const isFavourited = await prisma.favorite.findFirst({
    where: { userId: currentUserId, postId: targetPostId },
  });

  return <FavouriteButtonClient userId={currentUserId} postId={targetPostId} isFavourited={!!isFavourited} />;
};

export default FavouriteButton;
