var exec = require('child_process').exec;

function execute(command){
    return new Promise(function(resolve, reject)  {
        exec(command, function(error, stdout, stderr){
          //console.log(error);
          //console.log(stdout);
          //console.log(stderr);
           if(error)  {
               reject(error);
           } else if(stderr) {
              reject(stderr);
           } else if(stdout) {
               resolve(stdout);
           } else {
               resolve("command executed");
           }
        });
    });
};


module.exports.execute = execute;