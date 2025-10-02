import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const insert = mutation({
  args: {
    zpid: v.string(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    city: v.string(),
    streetAddress: v.string(),
    price: v.string(),
    imgSrc: v.string(),
    homeType: v.string(),
    preference: v.boolean(),
    nice_to_haves: v.array(v.string()),
    embedding: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    const propertyId = await ctx.db.insert("property", {
      ...args,
      nice_to_haves: args.nice_to_haves || [],
      embedding: args.embedding || [],
    });
    return propertyId;
  },
});

export const getByIds = query({
  args: { ids: v.array(v.id("property")) },
  handler: async (ctx, args) => {
    const { ids } = args;
    if (!ids.length) return [];

    // Fetch all properties with IDs in the provided array
    const properties = await Promise.all(ids.map((id) => ctx.db.get(id)));

    // Filter out any null results (in case an ID doesn't exist)
    return properties.filter(Boolean);
  },
});
