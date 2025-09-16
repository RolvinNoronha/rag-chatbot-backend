import { ChromaClient, type Collection } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";

let collection: Collection;
const initazeChroma = async () => {
  // Initialize with default settings
  const embedder = new DefaultEmbeddingFunction();

  //   // Or customize the configuration
  //   const customEmbedder = new DefaultEmbeddingFunction({
  //     modelName: "Xenova/all-MiniLM-L6-v2", // Default model
  //     revision: "main",
  //     dtype: "fp32", // or 'uint8' for quantization
  //     wasm: false, // Set to true to use WASM backend
  //   });

  const client = new ChromaClient({ host: "localhost", port: 8000 });
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

initazeChroma();

export default retrieveContext;
