/* ---
 * A Script to autoload all rooms into a redis server.
 *
 * This is supposed to be run once, at initialization, so I'm not concerned about the use of the Sync methods of 
 * file handling.
 *
 * vim: syntax=javascript tw=130 sw=2 foldmethod=marker:
 */

let redis = require('redis');
let rejson = require('redis-rejson');
let fs = require('fs');
let path = require('path');
let events = require('events');

let roomStore = "../roomdata";

rejson(redis);
let client = redis.createClient({
  host: 'localhost',
  port: 6379
});

let jsonKeyBase = "roomdata:";
let eventEmitter = new events.EventEmitter();

var exitListener = function exitListener() {
  console.log("Processing Finished.");
//  process.exit(0);
}

eventEmitter.addListener('processingdone', exitListener);

client.on('error', function(error) {
  console.log("connection to redis failed: ", error);
});

var files = fs.readdirSync(roomStore);

var filect = files.length;
var ct = 0;

files.forEach(function (file) {
  console.log("Processing file: " + file);
  let filepath = roomStore + "/" + file;
  let data = fs.readFileSync(filepath);
  let roomname = path.basename(file, '.json');
  let jsonkey = jsonKeyBase + roomname;

  client.json_set(jsonkey, '.', data, function (error) {
    if (error) { 
      console.log("Error setting roomdata for ", file); 
      client.quit();
      process.exit(1);
    }
  });

  ct = ct + 1;
  if(ct == filect) { eventEmitter.emit('processingdone'); }
});

