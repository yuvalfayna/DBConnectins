import mongoServer from './mongo_connection.js';
import redisServer from './redis_connection.js';

const startServices = async () => {
    try {
        await mongoServer;  
        console.log("MongoDB service started successfully.");

        await redisServer;  
        console.log("Redis service started successfully.");

    } catch (error) {
        console.error("Error starting services:", error);
    }
};

startServices();
