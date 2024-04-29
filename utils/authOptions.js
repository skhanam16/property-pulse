
import connectDB from "@/config/database";
import User from '@/models/User';
import GoogleProvider  from "next-auth/providers/google";


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
      }),
      // ...add more providers here
    ],
    callbacks: {
        // Invoked on successfull signin
        // profile as an object
        async signIn({ profile }) {
          // 1. Connect to database
          await connectDB();
          // 2. Check if user exists in database
          const userExists = await User.findOne({ email: profile.email });
    
          // 3. If not, create user in database
          if (!userExists) {
            // Truncate user name if too long
            const username = profile.name.slice(0, 20);
    
            await User.create({
              email: profile.email,
              username,
              image: profile.picture,
            });
          }
          // 4. return true to allow sign in
          return true;
        },

      // another call back 
      // MOdified the session object
      async session({ session }) {
        // 1. Get user from database
        const user = await User.findOne({ email: session.user.email });
        // 2. Assign user id from database to session
        session.user.id = user._id.toString();
        // 3. return session
        return session;
      }

  }
};


  // export default NextAuth(authOptions);