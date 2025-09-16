import redis from "redis";

const client = redis.createClient();
client.on("error", (error) => {
  console.error("Redis error: ", error);
});

client.connect();

export default client;
