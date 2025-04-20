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
    // Add logic to insert a property into Convex
    const property = await ctx.db.insert("property", args);
    return property.id;
  },
});

export const getByIds = query({
  args: { ids: v.array(v.id("property")) },
  handler: async (ctx, args) => {
    // Add logic to fetch properties by IDs
  },
});
