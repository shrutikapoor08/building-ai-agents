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
  try {
    // Convert property object to a string representation
    const propertyText = `
      Property in ${property.city} at ${property.streetAddress}.
      ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms.
      Price: ${property.price}.
      Home type: ${property.homeType || "Not specified"}.
      Nice to haves: ${property.nice_to_haves?.join(", ") || "None"}.
    `;

    // Use OpenAI to generate embeddings
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        input: propertyText,
        model: "text-embedding-3-small",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `OpenAI API error: ${error.error?.message || JSON.stringify(error)}`
      );
    }

    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
};
