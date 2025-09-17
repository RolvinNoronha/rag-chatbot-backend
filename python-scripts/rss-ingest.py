import feedparser
from sentence_transformers import SentenceTransformer
import chromadb
import numpy as np

# 1. Parse RSS feed
rss_url = "https://www.cnbc.com/id/100003114/device/rss/rss.html"
feed = feedparser.parse(rss_url)
articles = []
for entry in feed.entries[:50]:  # take 50 articles
    text = f"{entry.title}\n{entry.summary}"
    articles.append(text)

print(f"Number of articles fetched: {len(articles)}")

# 2. Chunking (simple split)
chunks = []
for art in articles:
    for i in range(0, len(art), 500):
        chunk = art[i:i+500]
        if chunk.strip():
            chunks.append(chunk)

print(f"Number of chunks created: {len(chunks)}")

if len(chunks) == 0:
    raise ValueError("No chunks to embed! Check RSS feed and chunking logic.")

# 3. Embeddings
model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(chunks)

print(f"Number of embeddings generated: {len(embeddings)}")
if len(embeddings) == 0:
    raise ValueError("Embeddings are empty! Check SentenceTransformer model usage.")

# Confirm embeddings shape and type
print(f"Embedding sample shape: {np.array(embeddings[0]).shape}")

# 4. Connect to Chroma DB server (make sure it's running at localhost:8000)
client = chromadb.HttpClient(host="localhost", port=8000)

# client = chromadb.CloudClient(
#   api_key='YOUR_API_KEY',
#   tenant='YOUR_TENANT_ID',
#   database='YOUR_DB_NAME'
# )

# Use get_or_create_collection to avoid overwrite errors
collection = client.get_or_create_collection("news")

# Add embeddings with documents and ids
collection.add(
    documents=chunks,
    embeddings=embeddings.tolist(),
    metadatas=[{"id": i} for i in range(57, len(chunks) + 57)],
    ids=[str(i) for i in range(57, len(chunks) + 57)]
)
print("Ingested", len(chunks), "chunks into vector DB")

  