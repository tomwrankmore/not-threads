import React from "react";
import { useFormStatus } from "react-dom";

// The form needs to be an ancestor of this button in order for useFormStatus hook to work.

export default function AddPostButton() {
  const {pending} = useFormStatus()
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      {pending ? 'Posting...' : 'Submit'} 
      
    </button>
  );
}
