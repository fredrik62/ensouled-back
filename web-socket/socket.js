const WebSocket = require('isomorphic-ws')
const http = require('http');

const ws = new WebSocket('wss://localhost:4200/highscore/ironman', {
  origin: 'http://localhost:4200/highscore/ironman'
});

ws.onopen = function open() {
  console.log('connected');
  ws.send(Date.now());
};

ws.onclose = function close() {
  console.log('disconnected');
};

ws.onmessage = function incoming(data) {
  console.log(`Roundtrip time: ${Date.now() - data} ms`);

  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
};