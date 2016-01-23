var exec = require('child_process').exec;

function execute(command){
    return new Promise(function(resolve, reject)  {
        exec(command, function(error, stdout, stderr){
           if(error)  {
               reject(error);
           } else if(stderr) {
              reject(stderr);
           } else if(stdout) {
               resolve(stdout);
           } else {
               reject(new Error("command returned no output", "node-cli/index.js execute function"));
           }
        });
    });
};

module.exports.execute = execute;