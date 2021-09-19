import { getRedisConnection, getRedisInstance } from '@/helpers/redis-creator'
import { StringKV } from '@/types/utils'
import { Queue } from 'bullmq'

const redis = getRedisConnection()
export const StatisticsQueue = new Queue('Statistics', redis)
export const TLoggerQueue = new Queue('TLogger', redis)
export const FirebaseNotifierQueue = new Queue('FirebaseNotifier', redis)
export const TranslationNotifierQueue = new Queue('TranslationNotifier', redis)
export const ParsersQueue = new Queue('Parsers', redis)

StatisticsQueue.on('error', console.error)
TLoggerQueue.on('error', console.error)
FirebaseNotifierQueue.on('error', console.error)
TranslationNotifierQueue.on('error', console.error)
ParsersQueue.on('error', console.error)
