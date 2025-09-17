import redis from "redis";
import ENV from "./env-variables.js";

// connect redis locally
// const client = redis.createClient({});

// @ts-ignore
const client = redis.createClient({
  username: ENV.REDIS_USERNAME,
  password: ENV.REDIS_PASSWORD,
  socket: {
    host: ENV.REDIS_HOST,
    port: Number(ENV.REDIS_PORT),
  },
});

client.on("error", (error) => {
  console.error("Redis error: ", error);
});

client.connect();

export default client;
