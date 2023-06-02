import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "",
  apiKey: ``,
});
const openai = new OpenAIApi(configuration);

export const trueOrFalse = async (message: string) => {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Give me a json string containing 1 true or false question and answer about ${message} ware. Return the question in the question key. Provide true or false in the answer key and more info in the reason key`,
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
