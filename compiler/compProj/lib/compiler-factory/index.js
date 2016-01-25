var fs = require("fs");

/**
 * Takes a filename and text and return a compiler interface
 * that can be use to execute commands via node-cli package
 * used with type script
 * @param fileName
 * @param fileTxt
 * @returns {{jFile: string, txtFile: string, outFile: string, writeTxt: writeTxt, compileCommand: string, readOutFileCommand: string, readJFileCommand: string, cleanUpCommand: string}}
 */
function compilerFactory(fileName, fileTxt) {
    fileTxt = fileTxt || "sample\ntext\nstuff\n";
    var prefixPath = "../test_script/";
    var jFile = prefixPath + fileName + ".j";
    var txtFile = prefixPath + fileName + ".txt";
    var outFile = prefixPath + fileName + ".out";

    var compileCommand = "../test_script/testScriptBash " + fileName;
    var readOutFile = "cat " + outFile;
    var readJFile = "cat " + jFile;
    var cleanUp = "rm " + jFile + " " + txtFile + " " + outFile;

    function writeTxt() {
        return new Promise(function (resolve, reject) {
            fs.writeFile(txtFile, fileTxt, (err) => {
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
