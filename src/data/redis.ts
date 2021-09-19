import { StringKV } from '@/types/utils'
import IORedis from 'ioredis'

const env: StringKV = process.env as any
const redisUri = env.REDIS_URL
let redis;
if(redisUri) {
    redis = new IORedis(redisUri)
} else {
    redis = new IORedis()
}

redis.on('error', console.error)

export default redis

export async function simpleMget (keys: (string | number)[], prefix: string): Promise<Record<string, string | number>> {
    let ret = {}

    const result = await redis.mget(...keys.map(i => prefix + i))
    result.forEach((value, i) => {
        ret[keys[i]] = value
    })

    return ret as any
}
