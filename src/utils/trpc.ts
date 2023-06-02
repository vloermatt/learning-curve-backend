import { inferAsyncReturnType, initTRPC } from "@trpc/server";

export const createContext = ({ event }: { event: any }) => {
  return {
    event: event,
    apiVersion: (event as { version?: string }).version || "1.0",
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
