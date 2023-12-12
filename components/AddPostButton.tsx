import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

// The form needs to be an ancestor of this button in order for useFormStatus hook to work.

export default function AddPostButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="outline"
      className=""
      type="submit"
    >
      {pending ? "Posting..." : "Submit"}
    </Button>
  );
}
