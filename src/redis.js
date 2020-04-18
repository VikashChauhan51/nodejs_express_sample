const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const client = redis.createClient();


const redisStore = new RedisStore({ 
   host: 'localhost', 
   port: 6379, 
   client: client, 
   ttl: 60*60*10 
  });

  function getAllActiveSessions() {
    return new Promise((resolve, reject) => {
        redisStore.all(function(err, sessions) {
            if(err) reject(err);
            else resolve(sessions);
        });
    });
}
module.exports = { redisStore, getAllActiveSessions };