const server = require('./build/app.bundle.server.js');

// import * as server from './build/bundle.server';
// console.log(server.default)
server.default.run();