import { Magic } from "@magic-sdk/admin";
//TODO remove atob import and assignment
//Next.js has a bug: Some Vercel regions don't provide the correct runtime (atob function) for serverless functions.
//https://github.com/magiclabs/magic-admin-js/issues/86
import atob from "atob";
globalThis.atob = atob;
export const magicAdmin = new Magic(process.env.MAGIC_SERVER_KEY);
