import React from "react";
import DeletePostButton from "./DeletePostButton";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

type PostProps = {
  id: string;
  title: string | null;
};

const PostPreview = ({ id, title }: PostProps) => {
  return (
    // <div className="border-solid border-2 border-sky-500 rounded p-4 mb-4">
    //   <h3>Author: {authorName}</h3>
    //   <h1>Title: {title}</h1>
    //   <p>{content}</p>
    //   <button className="block">
    //     <Link href={`single-post/${id}`}>View post</Link>
    //   </button>

    //   <DeletePostButton postId={id} />
    // </div>
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      {/* <CardContent>
        <p>{content}</p>
        <p>Author: {authorName}</p>
      </CardContent> */}
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`single-post/${id}`}>View post</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostPreview;
