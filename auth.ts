import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  // Below gives us access to id which connects users and posts in db. It adds id to session object.
  callbacks: {
    async session({session, user}) {
      session.user.id = user.id
      return session
    }
  },
});
