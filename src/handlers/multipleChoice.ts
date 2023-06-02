import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "",
  apiKey: ``,
});
const openai = new OpenAIApi(configuration);

export const multipleChoiceHandler = async (message: string) => {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Give me a json string containing 1 multiple choice question and answers about ${message}. Return the question in the question key and the answers must be an array of strings in the options key. Provide the answer in the answer key`,
        },
      ],
    });
    let responseObject = {
      // default error state
      error: "The content is not parsable",
    };
    res.data.choices.forEach((choice, idx) => {
      if (choice.message) {
        const content = choice.message?.content;
        if (content) {
          const obj = JSON.parse(choice.message?.content);
          if (obj) {
            responseObject = obj;
          }
        }
      }
    });
    return responseObject;
  } catch (err) {
    console.log("Err", err);
    return err;
  }
};
