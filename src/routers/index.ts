import { chatHandler } from "../handlers/chat";
import { generateText } from "../handlers/generateText";
import { multipleChoiceHandler } from "../handlers/multipleChoice";
import { trueOrFalse } from "../handlers/trueOrFalse";
import { publicProcedure, t } from "../utils/trpc";
import { z } from "zod";

export const appRouter = t.router({
  hello: publicProcedure.query(() => {
    return "Hi There!";
  }),
  chat: publicProcedure
    .input(
      z.object({
        message: z.string(),
      })
    )
    .query(async (req) => {
      return await chatHandler(req.input.message);
    }),
  generateText: publicProcedure
    .input(
      z.object({
        message: z.string(),
      })
    )
    .query(async (req) => {
      return await generateText(req.input.message);
    }),
  multipleChoice: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .query(async (req) => {
      return await multipleChoiceHandler(req.input.prompt);
    }),
  trueOrFalse: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .query(async (req) => {
      return await trueOrFalse(req.input.prompt);
    }),
});
