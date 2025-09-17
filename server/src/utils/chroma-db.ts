import { CloudClient, type Collection } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";
import ENV from "./env-variables.js";

let collection: Collection;
const initiazeChroma = async () => {
  // Initialize with default settings
  const embedder = new DefaultEmbeddingFunction();

  // connect chromadb locally
  // const client = new ChromaClient({ host: "localhost", port: 8000 });

  // @ts-ignore
  const client = new CloudClient({
    apiKey: ENV.CHROMA_CLOUD_API_KEY,
    tenant: ENV.CHROMA_CLOUD_TENANT,
    database: ENV.CHROMA_CLOUD_DB_NAME,
  });

  collection = await client.getCollection({
    name: "news",
    embeddingFunction: embedder,
  });
};

const retrieveContext = async (query: string) => {
  const results = await collection.query({
    queryTexts: [query],
    nResults: 3,
  });

  return results.documents.flat().join("\n");
};

initiazeChroma();

export default retrieveContext;
