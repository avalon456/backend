import { Worker } from 'bullmq'
import { StatisticsDay } from '@/models/StatisticsDay'
import { getRedisConnection, getRedisInstance } from '@/helpers/redis-creator'

const redis = getRedisConnection()
const worker = new Worker('Statistics', async ({ name, data }) => {
    if (name === 'stat-event') {
        await StatisticsDay.increment(data.name + (data.source ?? ''), data.count || 1)
    }
}, redis)

worker.on('error', console.error)
