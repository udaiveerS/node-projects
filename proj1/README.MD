This projects is using the core Node.js libraries to spin up a file server. The server has basic error handling and will give a 404 if anything goes wrong.

If you run this and type localhost:PORT/DIR/FILE_NAME. Server will parse the directory and file extension and if there if the file exists and the extension is supported it will return the file as a stream response.
