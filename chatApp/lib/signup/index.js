var mongo = require('mongodb').MongoClient;
var Login = require('../login');

module.exports = function(connectionString) {
    "use strict";

    var login = new Login(connectionString);

    /**
     * Creates a Mongo connection and adds a user to the
     * users collection and returns that users object
     * @param userCredentials
     * @returns {Promise}
     */
    function signupUser(userCredentials) {
        return new Promise((resolve, reject) => {
            mongo.connect(connectionString, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('users');
                    var userObject = {
                        username: userCredentials.username,
                        password: userCredentials.password,
                        default: userCredentials.default,
                        title: userCredentials.title,
                        avatar: userCredentials.avatar,
                        type: 'user'
                    };

                    collection.insert(userObject, function(err,user) {
                        if(err) {
                            reject(new Error("a user does not exist in the database"));
                        } else {
                            resolve(user);
                        }
                    });
                }
            });
        });
    }


    return {
        signup: (userCredentials) => {
            return login.userExists(userCredentials)
            .then((userCursor) => {
               return Error("a User was found by that name");
            },(err) => {
                // a User does not exist by that name
               return false;
            }).then((user) => {
              if(!user){
                  return signupUser(userCredentials);
              }
            });
        }
    }
}
