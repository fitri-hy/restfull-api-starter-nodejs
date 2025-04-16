const Bull = require('bull');
const redis = require('ioredis');

const isRedisEnabled = process.env.REDIS_TASK_ENABLE === 'true';

let redisClient;
let taskQueue;

if (isRedisEnabled) {
  redisClient = new redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  });

  taskQueue = new Bull('taskQueue', {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    },
  });

  // Workers handle asynchronous tasks
  taskQueue.process(async (job) => {
    console.log(`Processing job ${job.id}:`, job.data);

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`Completed job ${job.id}`);
    return `Task ${job.data.name} processed!`;
  });
} else {
  console.log('Redis is disabled. Bull queue will not be used.');
}

const addTaskToQueue = async (taskData) => {
  if (!isRedisEnabled) {
    console.log('Redis is disabled. Task not added to queue.');
    return null;
  }

  try {
    const job = await taskQueue.add(taskData);
    console.log(`Added job ${job.id} to queue`);
    return job.id;
  } catch (err) {
    console.error('Error adding task to queue:', err);
    throw err;
  }
};

const closeQueue = async () => {
  if (isRedisEnabled && taskQueue) {
    console.log('Closing Bull task queue...');
    await taskQueue.close();
    console.log('✅ Bull queue closed.');
  }

  if (redisClient) {
    console.log('Closing Redis client...');
    await redisClient.quit();
    console.log('✅ Redis client closed.');
  }
};

module.exports = {
  taskQueue,
  addTaskToQueue,
  closeQueue,
};
