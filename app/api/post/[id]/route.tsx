// LEGACY UNUSED

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

type Params = {
  id: string;
}

export async function DELETE(request:NextApiRequest, {params}:{params: Params}) {
  const id = params.id;
  const deletedItem = await prisma.post.delete({
    where: {id},
  });
  return NextResponse.json(deletedItem); 
}


