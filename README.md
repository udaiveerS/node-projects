# node-projects
This repo has multiple branches. Each branch is a fully functioning node project. 
Master is all the project folders in one repository 

## 1. Chat Server
## 2. Online TestScript Compiler

## Chat Server 
The Chat server is a project that is built in node.js and Socket.io using the bare minimum libraries. 
For this project I did not used express of mongoose, instead I used the connection library provided 
by mongoDB and I built my own way to do routing. 

Chat server has a working online demo at [q-apps.io](q-apps.io) The url could later change to chat.q-app.io. 
#### Features
* Self Syc chat with socket.io
* Account Creation 
* Login/Logout
* Dynamic updating live-users list 
* Connection persistence's across multiple platforms/browsers
* Good Desktop Usability & fair mobile compatibility
#### Blog for chat 
[My Node.js Chat server](https://medium.com/code-wave/the-perils-of-building-a-node-js-chat-server-cedceb2c667c#.q4bt4p57b)
blog entry talks more in depth about some design decision and problems that I encountered when building a chat app.

#### technologies 
* Database: MongoDb
* Socket.io
* Hosting: EC2 AWS Ubuntu 
* Nginx 

## TestScript Compiler
TestScript is a language that was designed for CS153: Compiler Design Class. The language is loosely based on Type Script 
The original repo for TestScript compiler can be found on [my git profile page](https://github.com/udaiveerS/CS-153). The 
online compiler is providing an online compiling service via node js with a UI so anyone can write a program in TestScript 
for them selves. 
