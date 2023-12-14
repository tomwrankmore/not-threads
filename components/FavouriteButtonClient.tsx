"use client";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { HeartOff, Heart, HeartIcon } from "lucide-react";
import { addFavourite, removeFavourite } from "@/lib/actions/actions";

type FavouriteButtonClientProps = {
  userId: string;
  postId: string;
  isFavourited: boolean;
};

const FavouriteButtonClient = ({
  userId,
  postId,
  isFavourited,
}: FavouriteButtonClientProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const addFavouriteWithId = addFavourite.bind(null, postId, userId);
  const removeFavouriteWithId = removeFavourite.bind(null, postId, userId);

  // logical or make isMutating true if either of these are true
  const isMutating = isFetching || isPending;

  return (
    <>
      {isFavourited ? (
        <form
          action={async () => {
            setIsFetching(true);
            const result = await removeFavouriteWithId();
            if (result?.error) {
              toast.error(result.error);
            } else {
              toast.success("Removing...");
            }
            setIsFetching(false);
            startTransition(() => {
              router.refresh();
            });
          }}
        >
          <Button
            variant="link"
            disabled={isMutating}
            
          >
            {!isMutating ? <Heart className="stroke-rose-700 hover:stroke-gray-400 fill-rose-700 hover:fill-none" /> : <LoadingSpinner />}
          </Button>
        </form>
      ) : (
        <form
          action={async () => {
            setIsFetching(true);
            const result = await addFavouriteWithId();
            if (result?.error) {
              toast.error(result.error);
            } else {
              toast.success("Adding to faves");
            }
            setIsFetching(false);
            startTransition(() => {
              router.refresh();
            });
          }}
        >
          <Button
            variant="link"
            disabled={isMutating}
            className= "text-white hover:text-gray-400"
          >
            {!isMutating ? <Heart/> : <LoadingSpinner />}
          </Button>
        </form>
      )}
    </>
  );
};

export default FavouriteButtonClient;
