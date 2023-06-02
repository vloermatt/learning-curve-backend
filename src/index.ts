import { createContext } from "./utils/trpc";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { appRouter } from "./routers";
export type AppRouter = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: ({ event }) => createContext({ event }),
  responseMeta: () => {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "any",
        "Access-Control-Allow-Credentials": "true",
      },
    };
  },
});
