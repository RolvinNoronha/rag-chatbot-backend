import feedparser
from sentence_transformers import SentenceTransformer
import chromadb

# 1. Parse RSS feed
rss_url = "https://feeds.bbci.co.uk/news/rss.xml"
feed = feedparser.parse(rss_url)

articles = []
for entry in feed.entries[:50]:  # take 50 articles
    text = f"{entry.title}\n{entry.summary}"
    articles.append(text)

# 2. Chunking (simple split)
chunks = []
for art in articles:
    for i in range(0, len(art), 500):  # every 500 chars
        chunks.append(art[i:i+500])

# 3. Embeddings
model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(chunks)

# 4. Connect to Chroma DB
client = chromadb.HttpClient(host="localhost", port=8000)  # Connect to local Chroma DB instance
collection = client.create_collection("news")

collection.add(
    documents=chunks,
    embeddings=embeddings.tolist(),
    metadatas=[{"id": i} for i in range(len(chunks))],
    ids=[str(i) for i in range(len(chunks))]
)

print("Ingested", len(chunks), "chunks into vector DB")
