var socket = io();
var ctx    = document.getElementById('myChart');

var startTime = Date.now();

// Setup Chart
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'CPU Usage (%)',
            data: []
        }]
    },
    options: {}
});

// Setup socket.io callbacks
socket.on('cpu-stats', function(use) {
    myChart.data.labels.push(Date.now() - startTime);
    if(myChart.data.labels.length > 120) {
        myChart.data.labels.shift();
    }
    myChart.data.datasets[0].data.push(use);
    if(myChart.data.datasets[0].data.length > 120) {
        myChart.data.datasets[0].data.shift();
    }
    myChart.update();
});

// Document event listeners
document.getElementById('btn-cpu-tests').onclick = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/cpu', true);
    xhttp.send();
}