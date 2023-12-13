"use client";

import { followUser, unfollowUser } from "@/lib/actions/actions";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import LoadingSpinner from "./LoadingSpinner";

type FollowClientProps = {
  targetUserId: string;
  currentUserId: string;
  isFollowing: boolean;
};

export default function FollowClient({
  targetUserId,
  currentUserId,
  isFollowing,
}: FollowClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const followUserWithId = followUser.bind(null, targetUserId, currentUserId);
  const unfollowUserWithId = unfollowUser.bind(
    null,
    targetUserId,
    currentUserId
  );

  // logical or make isMutating true if either of these are true
  const isMutating = isFetching || isPending;

  return (
    <>
      {isFollowing ? (
        <form
          action={async () => {
            setIsFetching(true);
            const result = await unfollowUserWithId();
            if (result?.error) {
              toast.error(result.error);
            } else {
              toast.success(`Successfully unfollowed!`);
            }
            setIsFetching(false);
            startTransition(() => {
              router.refresh();
            });
          }}
        >
          <Button variant="outline"disabled={isMutating}>{!isMutating ? "Unfollow" : <LoadingSpinner />}</Button>
        </form>
      ) : (
        <form
          action={async () => {
            setIsFetching(true);
            const result = await followUserWithId();
            if (result?.error) {
              toast.error(result.error);
            } else {
              toast.success(`Successfully followed!`);
            }
            setIsFetching(false);
            startTransition(() => {
              router.refresh();
            });
          }}
        >
          <Button variant="outline" disabled={isMutating}>{!isMutating ? "Follow" : <LoadingSpinner />}</Button>
        </form>
      )}
    </>
  );
}
