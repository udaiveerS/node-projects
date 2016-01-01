var fs = require('fs');
var path = require('path');

/**
 * return a static file serve function
 * @param mimes
 * @returns {{serveFiles: serveFiles}}
 */
module.exports = function(mimes) {
    "use strict";
    this.mimes = mimes;
     /**
     * Takes a file path for all static content and
     * returns the respective resource like {index.htm,main.css...}
     * @param filePath a absolute path base on CWD
     * @returns {Promise}
     */
    function getFileContent(filePath) {
        return new Promise((resolve,reject) => {
            "use strict";
            fs.access(filePath, fs.F_OK, (error) => {
                if(error) {
                    reject(error)
                } else {
                    fs.readFile(filePath, (error, content) => {
                        if(error) {
                            reject(error);
                        } else {
                            resolve(content);
                        }
                    });
                }
            });
        });
    }

    return {
    /**
     * If static file is found then the file is sent
     * mimes is an array for each respective mime type
     * base on the file type extension of the url
     * @param req
     * @param res
     */
        serveFiles: (req, res) => {
            var filePath = req.filePath;
            //console.log(filePath);
            getFileContent(filePath).then((content) => {
                "use strict";
                var contentType = this.mimes[path.extname(filePath)];
                res.writeHead(200, {'Content-type': contentType});
                res.end(content, 'utf-8');
            }).catch((err) => {
                "use strict";
                res.writeHead(500);
                res.end("<h1>" + err.toString() + "</h1>");
            });
        }
    }
};


