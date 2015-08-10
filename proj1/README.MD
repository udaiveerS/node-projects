This projects is using the core Node.js libraries to basicly spinn up a file server. The server has 
basic error handeling and will give a 404 if anything goes wrong. 


If you run this and type localhost:PORT/__DIR__/__FILE_NAME__. Server will parse the directory and
file extention and if there if the file exists and the extention is supported it will return the 
file as a stream response. 
