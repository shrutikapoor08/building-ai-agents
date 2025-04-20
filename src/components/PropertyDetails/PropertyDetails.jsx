import React, { useState } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import "../../App.css";

function PropertyDetails({
  property: {
    bedrooms,
    bathrooms,
    city,
    streetAddress,
    price,
    imgSrc,
    homeType,
    zpid,
  },
}) {
  const [propertyDetails, setPropertyDetails] = useState({});
  const insertProperty = useMutation(api.property.insert);

  const handleLike = async () => {
    const property = {
      bedrooms,
      bathrooms,
      city,
      streetAddress,
      price: price.toString(), // Ensure price is a string
      imgSrc,
      homeType,
      zpid: zpid.toString(), // Ensure zpid is a string
      preference: true,
      nice_to_haves: propertyDetails?.nice_to_haves || [],
    };

    try {
      // Generate embeddings and save to Convex
      const response = await fetch("/api/generate-embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });

      if (!response.ok) {
        throw new Error("Failed to generate embeddings");
      }

      const { embedding } = await response.json();

      // Save to Convex with embedding
      await insertProperty({
        ...property,
        embedding,
      });

      // Optional: Show success notification
      console.log("Property saved successfully");
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const handleDislike = async () => {
    const property = {
      bedrooms,
      bathrooms,
      city,
      streetAddress,
      price: price.toString(), // Ensure price is a string
      imgSrc,
      homeType,
      zpid: zpid.toString(), // Ensure zpid is a string
      preference: false,
      nice_to_haves: propertyDetails?.nice_to_haves || [],
    };

    try {
      const response = await fetch("/api/generate-embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });

      if (!response.ok) {
        throw new Error("Failed to generate embeddings");
      }

      const { embedding } = await response.json();

      await insertProperty({
        ...property,
        embedding,
      });

      console.log("Property saved successfully");
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  return (
    <div
      key={zpid}
      className="flex flex-col bg-white rounded-lg overflow-hidden border border-[#e3e3e3] hover:shadow-md transition-shadow text-center"
    >
      <PropertyCard
        zpid={zpid}
        imgSrc={imgSrc}
        price={price}
        propertyDetails={propertyDetails}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        streetAddress={streetAddress}
        city={city}
        homeType={homeType}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </div>
  );
}

export default PropertyDetails;
