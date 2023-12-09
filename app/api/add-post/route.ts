// LEGACY UNUSED

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const res = await request.json();
  const { title, content } = res;

  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: true,
    },
  });
  return NextResponse.json({ result }); 
}