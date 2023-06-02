import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-yWZuUyVHW96OXl6ySsBRocvL",
  apiKey: `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`,
});
const openai = new OpenAIApi(configuration);

export const chatHandler = async (message: string) => {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Err", err);
    return err;
  }
};
