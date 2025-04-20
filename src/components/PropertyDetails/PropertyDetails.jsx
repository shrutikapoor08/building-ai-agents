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

  const handleLike = async () => {
    console.log("liked a property");
  };

  const handleDislike = async () => {
    console.log("disliked a property");
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
