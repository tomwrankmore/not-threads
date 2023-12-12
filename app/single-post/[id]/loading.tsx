import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="max-w-md mx-auto mt-8">
      <LoadingSkeleton />
    </main>
  );
}
