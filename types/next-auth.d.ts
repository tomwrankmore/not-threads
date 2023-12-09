
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  /** Now everywhere you reference the you'll be able to have an id property./ */
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}