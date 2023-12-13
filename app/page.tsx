import Post from "../components/post/Post";
import { getAllPosts } from "@/lib/data";
import { redirect } from 'next/navigation'
export default async function Home() {
  const posts = await getAllPosts();
  redirect('/all-posts')
}
