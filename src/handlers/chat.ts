import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "",
  apiKey: ``,
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
