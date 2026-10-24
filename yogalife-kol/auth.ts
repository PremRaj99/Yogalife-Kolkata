import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { isAdminEmail } from "@/lib/admin";

// Reads AUTH_SECRET, AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET from the environment.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: { signIn: "/admin", error: "/admin" },
  callbacks: {
    // Only verified Google accounts on the allow-list can sign in.
    signIn({ profile }) {
      return profile?.email_verified === true && isAdminEmail(profile.email);
    },
  },
});
