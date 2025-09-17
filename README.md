# News Chatbot Backend

This is the **backend application** for the RAG-powered News Chatbot.  
It manages embeddings, retrieval, and conversation history. The backend is built with **Node.js (Express)** and integrates with **Python scripts**, **Redis**, **ChromaDB**, and the **Gemini API**.

---

## Features

- Ingest news articles into ChromaDB vector store
- Generate answers using **Gemini API**
- Manage sessions with unique session IDs
- Store chat history in **Redis**

---

## Prerequisites

- Node.js **>=18**
- Python **>=3.9**
- Docker & Docker Compose
- Redis & ChromaDB (started via Docker)
- Gemini API Key

---


## Development Notes

- For **local development**, uncomment the development mode connections for Redis & ChromaDB inside `server/src/utils/chroma-db.ts` and `server/src/utils/redis-client.ts` and comment out the cloud connection in the same files.


---

## Setup Instructions


### 1. Clone Repository

```
git clone https://github.com:RolvinNoronha/rag-chatbot-backend.git
cd rag-chatbot-backend
```

---

### 2. Start Vector DB and Redis with Docker

Navigate to the `python_scripts/` folder and run:

```
cd python_scripts
docker compose up -d
```

This will start **ChromaDB** and **Redis** in containers.

---

### 3. Ingest News Corpus

Install Python dependencies and run ingestion:

```
pip install feedparser chromadb sentence_transformers
python rss-ingest.py
```

---

### 4. Configure Environment Variables

Create a `.env` file in the **server** root:

```
PORT=3000
GEMINI_API_KEY=<your-gemini-api-key>
```


---

### 5. Install Node.js Dependencies

```
cd server
npm install
```

---

### 6. Start Backend Server

```
npx nodemon
```


Server will be available at: http://localhost:3000/






