//redisService.js

const redis = require('redis');
const logger = require('../utils/logger');


const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  logger.error('Redis Client Error: ' + err);
});

(async () => {
  try {
    await redisClient.connect();
    logger.info('Redis Connected');
  } catch (err) {
    logger.error('Redis Connection Failed: ' + err.message);
  }
})();

const addToStream = async (stream, data) => {
  // Flatten the object into an array like ['key1', 'value1', 'key2', 'value2']
  const flattenedData = Object.entries(data).flatMap(([k, v]) => [k, String(v)]);

  try {
    await redisClient.xAdd(stream, '*', flattenedData);
    logger.info(`Data pushed to Redis stream: ${stream}`);
  } catch (err) {
    logger.error(`Error pushing to Redis stream: ${err.message}`);
  }
};

module.exports = { addToStream, redisClient };
