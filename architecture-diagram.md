# Real Estate Application Architecture

```mermaid
graph TD
    subgraph "Frontend (React)"
        App[App.jsx]
        Routes[TanStack Router]
        Components[UI Components]
        QueryClient[TanStack Query]
    end

    subgraph "Backend (Express)"
        API[Express API Server]
        AgentModule[Real Estate Agent]
        LLMModule[LLM API]
    end

    subgraph "External Services"
        OpenAI[OpenAI API]
        ZillowAPI[Zillow API via RapidAPI]
        LangChain[LangChain/LangGraph]
    end

    subgraph "Database"
        Convex[Convex Vector DB]
    end

    App --> Routes
    App --> Components
    App --> QueryClient
    
    QueryClient --> API
    
    API --> AgentModule
    API --> LLMModule
    API --> Convex
    API --> ZillowAPI
    
    AgentModule --> OpenAI
    AgentModule --> LangChain
    
    LLMModule --> OpenAI
    LLMModule --> LangChain
    
    Components --> QueryClient
```

## Key Components

- **Frontend**: React 19 with TanStack Router and Query for data fetching
- **Backend**: Express server handling API requests
- **Database**: Convex for vector storage and similarity search
- **AI Components**: 
  - LangChain/LangGraph for agent workflows
  - OpenAI for embeddings and natural language processing
- **External APIs**: Zillow API for property data