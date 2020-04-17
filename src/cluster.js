const cluster = require('cluster');
const os = require('os');



if (cluster.isMaster) {
    var numCPUs = os.cpus().length;
    console.log(`Master cluster setting up ${numCPUs} workers...`);
    for (var i = 0; i < numCPUs; i++) {
        // Create a worker
        createWorker();
    }
} else {
    // Workers share the TCP connection in this server
    require('./app');
}

function createWorker(){
    cluster.fork();
}

cluster.on('exit', (worker, code, signal)=> {
    if (code!==0 && !worker.exitedAfterDisconnect){
    console.log('Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal || code);
    createWorker();
    }
});
cluster.on('online', (worker)=> {
    console.log('Worker ' + worker.process.pid + ' is online');
});
cluster.on('listening', (worker, address)=> {
    console.log("A worker is now connected to " + address.address + ":" + address.port);
  });
  cluster.on('disconnect', (worker)=> {
    console.log('The worker #' + worker.id + ' has disconnected');
  });