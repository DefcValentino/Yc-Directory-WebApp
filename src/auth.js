import { getServerSession } from "next-auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client, writeClient } from "./sanity/lib/write-client";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user:{name, email, image}, account, profile:{id, login, bio} }) {
      //check if the user is already in the database
      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id,
      
      });

      if (!existingUser) {
        //create the user in the database
        await writeClient.create({
          _type: "author",
          _id: id,
          name,
          username:login,
          email,
          image,
          bio: bio || ''
        });
      }

      //if the user is already in the database, return true
      return true;
  
    },
 
    async jwt({ token, account, profile}) {

      //if the user is already in the database, return true
       if (account && profile) {
         const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          
          id: profile?.id,
       });

       token.id = user?._id;
    }

    return token;
  
  },

  async session({ session, token }) {
    // Add the user ID to the session
    if (token?.id) {
      session.user.id = token.id;
    }
    return session;
  }
},

  secret: process.env.AUTH_SECRET,
};


// This is the recommended way to use NextAuth.js in API routes
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


// ✅ Helper function for server-side usage
export async function auth() {
  return await getServerSession(authOptions);
}
