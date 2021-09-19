import { StringKV } from "@/types/utils";
import IORedis from "ioredis";

export function getRedisInstance(): any {
  
  const env: StringKV = process.env as any;
  const redisUri = env.REDIS_URL;
  const redisHost = env.REDIS_HOST;
  const redisPort = Number(env.REDIS_PORT);
  const redisPassword = env.REDIS_PASSWORD;
  if (redisUri) {
    // return  new IORedis(redisUri)
    return new IORedis({
      host: redisHost,
      port: redisPort,
      password: redisPassword,
    });
  } else {
    return new IORedis();
  }
}
export function getRedisConnection(): any {
  const env: StringKV = process.env as any;
//   const redisHost = env.REDIS_HOST;
//   const redisPort = Number(env.REDIS_PORT);
  
  return { connection: getRedisInstance() };
}
