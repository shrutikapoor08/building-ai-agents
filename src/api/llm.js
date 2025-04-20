import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";
import "dotenv/config";

const llmApi = async (description) => {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      location: z
        .string()
        .describe(
          "The location where the user is looking for a property. If nothing is passed, return Seattle, WA"
        ),
      bedrooms: z
        .number()
        .describe(
          "The number of bedrooms the user is looking for. If nothing is passed, return 3"
        ),
      price_starting: z
        .string()
        .describe(
          "The starting price range the user is looking for. If nothing is passed, return 500000"
        ),
      price_ending: z
        .string()
        .describe(
          "The ending price range the user is looking for. If nothing is passed, return 1000000"
        ),
      listingStatus: z
        .enum(["For_Sale", "For_Rent", "For_Sale_Or_Rent"])
        .default("For_Sale")
        .optional()
        .describe(
          "If the user is looking for a property for rent, then return For_Rent. If the user is looking for a property for sale, then return For_Sale. If the user is looking for a property for rent or sale, then return For_Sale_Or_Rent. If nothing is passed, return For_Sale"
        ),
    })
  );

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      "Parse the description provided by user to extract information about real estate preferences.\n{format_instructions}\n{description}."
    ),
    llm,
    parser,
  ]);

  const response = await chain.invoke({
    description: description,
    format_instructions: parser.getFormatInstructions(),
  });

  return response;
};

export default llmApi;

export const generateEmbeddings = async (property) => {
  //generate embeddings for property
};
