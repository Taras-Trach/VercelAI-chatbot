import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        PINECONE_API_KEY: z.string().min(1),
        OPENAI_API_KEY: z.string().min(1),
        PINECONE_INDEX: z.string().min(1),
        UNSTRUCTURED_API_KEY: z.string().min(1),
        UNSTRUCTURED_API_URL: z.string().url(),
    },
    client: {
        NEXT_PUBLIC_BASE_URL_BE: z.string().min(1),
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        PINECONE_API_KEY: process.env.PINECONE_API_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        NEXT_PUBLIC_BASE_URL_BE: process.env.NEXT_PUBLIC_BASE_URL_BE,
        PINECONE_INDEX: process.env.PINECONE_INDEX,
        UNSTRUCTURED_API_KEY: process.env.UNSTRUCTURED_API_KEY,
        UNSTRUCTURED_API_URL: process.env.UNSTRUCTURED_API_URL,
    },
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    // experimental__runtimeEnv: {
    //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    // }
});