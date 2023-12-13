"use client";

import { followUser, unfollowUser } from "@/app/actions/actions";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

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
  const followUserWithId = followUser.bind(null, targetUserId, currentUserId);
  const unfollowUserWithId = unfollowUser.bind(null, targetUserId, currentUserId);

  return (
    <>
      {isFollowing ? (
          <form
          action={async () => {
            const result = await unfollowUserWithId();
            if (result?.error) {
              toast.error(result.error);
            } else {
              toast.success(`Successfully unfollowed!`);
            }
          }}
        >
          <Button>Unfollow</Button>
        </form>
      ) : (
        <form
          action={async () => {
            const result = await followUserWithId();
            if (result?.error) {
              toast.error(result.error);
            } else {
              toast.success(`Successfully followed!`);
            }
          }}
        >
          <Button>Follow</Button>
        </form>
      )}
    </>
    // <form
    //   action={async () => {
    //     const result = await followUserWithId();
    //     if (result?.error) {
    //       toast.error(result.error);
    //     } else {
    //       toast.success(`Successfully followed!`);
    //     }
    //   }}
    // >
    //   <Button>Followwwww</Button>
    // </form>
  );
}
