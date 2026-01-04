import "dotenv/config";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    deleteUser: {
			enabled: true
		},
    additionalFields: {
      money: {
        type: "number",
        required: false,
        defaultValue: 0,
      },
      flags: {
        type: "string[]",
        required: false,
        defaultValue: [],
      },
    },
  },
  socialProviders: { 
    discord: { 
      clientId: process.env.DISCORD_CLIENT_ID!, 
      clientSecret: process.env.DISCORD_CLIENT_SECRET!, 
      refreshAccessToken: async (token) => {
        return {
          accessToken: "new-access-token",
          refreshToken: "new-refresh-token",
        };
      },
    },
    google: { 
      prompt: "select_account", 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    },  
  }, 
  session: {
	expiresIn: 60 * 60 * 24, // 24 hours instead of 1 hour
	freshAge: 60 * 60 * 24, // Fresh for 24 hours
	disableSessionRefresh: true
},trustedOrigins: [
		"http://localhost:5173",
	],
});