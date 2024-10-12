import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "" },
                plainPassword: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                console.log(credentials);

                const existingUser = await db.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });
                // console.log(existingUser);

                if (!existingUser) {
                    // console.log("no user");

                    throw new Error("no user");
                }
                try {
                    // console.log(credentials.plainPassword);
                    // console.log(existingUser.hashedPassword);
                    
                        
                    const passwordValidation = await bcrypt.compare(credentials.plainPassword, existingUser.hashedPassword);
                    // console.log(passwordValidation);

                    if (!passwordValidation) {
                        console.log("invalid pswd");

                        throw new Error("invalid password");
                    }
                    console.log("ok");

                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.email
                    }
                }
                catch (e: any) {
                    console.log(e);
                    
                }
            }
        })
    ],

    secret: process.env.JWT_SECRET,

    callbacks: {
        //TODO: change token according to hitesh in freq
        async session({ token, session }: any) {
            if (token.sub) {
                session.user.id = token.sub;
            }
            return session
        }
    },

    pages: {
        signIn: '/sign-in'
    }
}