var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var path    = require('path');
var io      = require('socket.io')(http);
var os      = require('os-utils');
var shell   = require('shelljs');

app.use(express.static(path.join(__dirname, '..', 'client')));

app.post('/cpu', function() {
    shell.exec('sudo ./benchmark.sh', {silent: false, async: true});
});

io.on('connection', function(socket){
    console.log('a user connected');
    setInterval(function() {
        os.cpuUsage(function(use) {
            io.emit('cpu-stats', JSON.stringify(use));
        });
    }, 1000);
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});