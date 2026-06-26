import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("ticket-booking-user-info");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                default: 'user'
            },
            isFraud: {
                type: "boolean",
                default: false,
            },
        }
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 7 * 60,
            strategy: 'jwt'
        }
    },

    plugins: [
        jwt(),
    ],


    database: mongodbAdapter(db, {
        client
    }),

     socialProviders: {
        google: {
            clientId: process.env.Client_ID,
            clientSecret: process.env.Client_secret,
        },
    },
});