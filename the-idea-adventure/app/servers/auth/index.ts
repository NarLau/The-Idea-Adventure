import "dotenv/config";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
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
        } 
    }, 
});