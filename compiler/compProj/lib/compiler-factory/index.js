var fs = require("fs");

/**
 * Takes a filename and text and return a compiler interface
 * that can be use to execute commands via node-cli package
 * used with type script
 * @param fileName
 * @param fileTxt
 * @returns {{jFile: string, txtFile: string, outFile: string, writeTxt: writeTxt, compileCommand: string, readOutFileCommand: string, readJFileCommand: string, cleanUpCommand: string}}
 */
function compilerFactory(fileName, fileTxt, dirname, file_id) {
    //console.log(fileName);
    //console.log(dirname);
    //console.log(file_id);

    fileTxt = fileTxt || "sample\ntext\nstuff\n";
    var jFile = fileName + ".j";
    var txtFile = fileName + ".txt";
    var outFile = fileName + ".out";

    var txts = dirname + "*.txt";
    var jays = dirname + "*.j";
    var outs = dirname + "*.out";
    var classes = dirname + "*.class";

    var compileCommand = dirname + "testScriptBash " + fileName + " " + dirname + " " + file_id ;
    var readOutFile = "cat " + outFile;
    var readJFile = "cat " + jFile;

    var cleanUp = "rm " + txts + " " + jays + " "  + outs +  " " + classes;

    function writeTxt(fullpath) {
     // console.log(fileTxt);
        return new Promise(function (resolve, reject) {
            fs.writeFile(txtFile, fileTxt,{ flags: 'wx' }, (err) => {
                //console.log("eerr = " +  err);
                if (err) reject(err);
                resolve('saved');
            });
        });
    }

    return {
        jFile: jFile,
        txtFile: txtFile,
        outFile: outFile,
        writeTxt: writeTxt,
        compileCommand: compileCommand,
        readOutFileCommand: readOutFile,
        readJFileCommand: readJFile,
        cleanUpCommand: cleanUp
    }
}

module.exports.compilerFactory = compilerFactory;
