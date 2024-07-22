import { sql } from '@vercel/postgres';
import {  type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		async signIn({user}) {
			const email = user.email;
			if(email){
				const result = await sql`SELECT * FROM usertable WHERE email = ${email}`;
				if(result.rowCount === 0){
					user.id = crypto.randomUUID();
					await sql`INSERT INTO usertable (id, name, email) VALUES (${user.id}, ${user.name || "noname"}, ${email})`;
				} else {
					const userSaved = result.rows[0];
					console.log("userSaved: ", userSaved);
					user.id = userSaved.id;
				}
			}
		  return true;
		},
		async session({ session, token }) {
			if(session.user){
				session.user.id = token.id as string;
			}

			return session;
		},
		async jwt({ token, user }) {
			if (user) {
			  token.id = user.id;
			}
			return token;
		  },
	}
};
