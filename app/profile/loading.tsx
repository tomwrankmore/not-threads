import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import PageWrapper from "@/components/PageWrapper";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <PageWrapper>
      <LoadingSkeleton />
    </PageWrapper>
  );
}
