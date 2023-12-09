"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// interface FormProps {
//   onSubmit: (title: string, content: string) => void;
// }

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit function - api route to persist to DB

    try {
      await fetch("/api/add-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      
    } catch (error) {
      console.error(error);
    }

    
  };

  return (
    <main className="max-w-md mx-auto mt-8">
      <h1>Add post</h1>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
          ></textarea>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

// export default AddPost;
