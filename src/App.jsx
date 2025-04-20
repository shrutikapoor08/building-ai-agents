import React, { useState, useRef } from "react";
import "./App.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import PropertyCard from "./components/PropertyCard/PropertyCard.jsx";
import Header from "./components/Header/Header.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import PropertiesListings from "./components/PropertiesListings/PropertiesListings.jsx";

const PREFERENCE = { LIKED: true, DISLIKED: false, NO_PREFERENCE: undefined };

const Loader = () => (
  <div className="flex justify-center items-center m-10">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);
const Error = ({ error }) => (
  <div className="flex justify-center items-center">
    <h1 className="text-red-500">{error.message}</h1>
  </div>
);

// Mock data for Step 1
const MOCK_PROPERTIES = [
  {
    property: {
      zpid: "1",
      address: {
        streetAddress: "123 Main St",
        city: "Seattle",
        state: "WA",
        zipcode: "98101",
      },
      price: 750000,
      bedrooms: 3,
      bathrooms: 2,
      livingArea: 1800,
      description: "Beautiful 3 bedroom home in Seattle",
      imgSrc:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  },
  {
    property: {
      zpid: "2",
      address: {
        streetAddress: "456 Pine St",
        city: "Seattle",
        state: "WA",
        zipcode: "98102",
      },
      price: 850000,
      bedrooms: 4,
      bathrooms: 3,
      livingArea: 2200,
      description: "Spacious 4 bedroom home with great views",
      imgSrc:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  },
  {
    property: {
      zpid: "3",
      address: {
        streetAddress: "789 Lake Ave",
        city: "Seattle",
        state: "WA",
        zipcode: "98103",
      },
      price: 650000,
      bedrooms: 3,
      bathrooms: 2,
      livingArea: 1600,
      description: "Cozy 3 bedroom near the lake",
      imgSrc:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
    },
  },
  {
    property: {
      zpid: "4",
      address: {
        streetAddress: "101 Queen Anne Rd",
        city: "Seattle",
        state: "WA",
        zipcode: "98109",
      },
      price: 950000,
      bedrooms: 5,
      bathrooms: 3.5,
      livingArea: 2800,
      description: "Luxury 5 bedroom in Queen Anne",
      imgSrc:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  },
];

function App() {
  const ref = useRef("");
  const [searchInput, setSearchInput] = useState("");
  const allDataRef = useRef(MOCK_PROPERTIES);

  const {
    isLoading,
    isError,
    error,
    refetch,
    data: properties,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [searchInput],
    queryFn: getPropertiesFromMockData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // Calculate the total number of items displayed so far
      const totalDisplayed = pages.flat().length;

      // If all items have been displayed, stop pagination
      if (allDataRef.current && totalDisplayed >= allDataRef.current.length) {
        return undefined; // No more pages
      }
      // Return the next page number (incremented by 1 for each page)
      return pages.length;
    },
  });

  const getProperties = () => {
    if (properties?.pages?.flat().length === 0) return null;
    const filteredData =
      properties?.pages?.flat().filter((item) => !!item && item.property) || [];

    if (!filteredData.length) return null;

    return filteredData;
  };

  // Replaced API call with mock data function
  async function getPropertiesFromMockData({ pageParam = 0 }) {
    if (!ref.current) return [];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (pageParam === 0) {
      return allDataRef.current.slice(0, 2);
    } else {
      const start = pageParam * 2;
      const end = start + 2;
      return allDataRef.current.slice(start, end);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput) return;
    ref.current = searchInput;
    refetch();
  };

  return (
    <main className="min-h-screen">
      <section className="w-full bg-gradient-to-r from-purple-600 to-blue-500 py-16">
        <div className="container mx-auto">
          <Header />
          <SearchBar
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSearch={handleSubmit}
            onFillDescription={() =>
              setSearchInput(
                "Looking for a 3 bedroom house in Seattle in the range of 600000 to 900000 for sale"
              )
            }
          />
        </div>
      </section>

      {isLoading && <Loader />}
      {isError && <Error error={error} />}
      {!getProperties() && !isLoading && (
        <div className="flex justify-center py-8">
          <h2 className="text-2xl"> Search for a property to get started</h2>
        </div>
      )}

      {getProperties()?.length > 0 && (
        <section
          id="search-listings"
          className="container mx-auto w-full py-12"
        >
          <PropertiesListings
            properties={properties?.pages?.flat()}
            title="Seattle WA Real Estate & Homes For Sale"
          >
            {properties?.pages?.flat().map(({ property }) => (
              <PropertyCard key={property.zpid} property={property} />
            ))}
          </PropertiesListings>
        </section>
      )}

      {hasNextPage && getProperties()?.length > 0 && (
        <div className="flex justify-center py-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            {isFetchingNextPage
              ? "Loading more properties..."
              : hasNextPage
                ? "Show More Properties"
                : "No more properties to load"}
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
