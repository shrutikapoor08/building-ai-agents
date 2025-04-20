import React from "react";
import { MessageSquare, Heart, HeartOff } from "lucide-react";
import useAgentStore from "../../store/agentStore";

function PropertyActions({ onLike, onDislike }) {
  return (
    <div className="flex flex-col justify-center align-center mb-5 mt-5">
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={onLike}
          className="flex text-md items-center justify-center px-4 py-2 text-gray-700 hover:text-blue-500"
        >
          <Heart className="h-4 w-4 ml-2" />
          <span className="ml-2">Like</span>
        </button>
        <button
          onClick={onDislike}
          className="flex text-md items-center justify-center px-4 py-2 text-gray-700 hover:text-blue-500"
        >
          <HeartOff className="h-4 w-4 ml-2" />
          <span className="ml-2">Dislike</span>
        </button>
      </div>
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={() => console.log("Ask a question")}
          className="flex text-md items-center justify-center px-4 py-2 text-gray-700 hover:text-blue-500"
        >
          <MessageSquare className="h-4 w-4 ml-2" />
          <span className="ml-2">Ask a question</span>
        </button>
      </div>
    </div>
  );
}

export default PropertyActions;
