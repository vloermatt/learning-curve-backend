import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "",
  apiKey: ``,
});
const openai = new OpenAIApi(configuration);

export const generateText = async (message: string) => {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Explain a ${message} concept in 2 paragraphs`,
        },
      ],
    });
    let responseObject = {
      // default error state
      message: "The content is not parsable",
    };
    res.data.choices.forEach((choice, idx) => {
      if (choice.message) {
        const content = choice.message?.content;
        if (content) {
          responseObject = {
            message: content,
          };
        }
      }
    });
    return responseObject;
  } catch (err) {
    console.log("Err", err);
    return err;
  }
};
