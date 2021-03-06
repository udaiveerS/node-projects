var mongo = require('mongodb').MongoClient;

module.exports = function(connectionString) {
    // connection string is the URL for the mongoDB connection
    /**
     * Finds if user exists by a given username and return a cursor
     * @param loginData
     * @returns {Promise} a cursor to the user if found or rejects promise
     */
    function findUserExists(loginData) {
        "use strict";
        return new Promise((resolve, reject) => {
            mongo.connect(connectionString, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('users');
                    var aUserCursor = collection.find({username: loginData.username});
                     aUserCursor.count(true).then((val) => {
                         //console.log('size is ' + val);
                         if(val === 1) {
                             resolve(aUserCursor);
                         } else {
                             reject(new Error("a user does not exist in the database"));
                         }
                     });
                }
            });
        });
    }

    /**
     * If the user does exist in the database then the function
     * will take the single user entry and check for a password
     * against that username
     * @param aUserCursor
     * @param loginData
     * @returns {Promise}
     */
    function confirmPassword(aUserCursor, loginData) {
        "use strict";
        return new Promise((resolve, reject) => {
            //console.log("confirm pass 1");
           if(aUserCursor.hasNext()) {
               var aUser = aUserCursor.next();
               //console.log("confirm pass 2");
               return aUser.then(val => {
                   //console.log(val)
                   if (val.password === loginData.password) {
                       //console.log("confirm pass 3");
                       resolve(aUser)
                   } else {
                       //console.log("confirm pass 4");
                       reject(false);
                   }
               })
           } else {
               //console.log("confirm pass 5");
               reject(false);
           }
        });
    }


    return {
        /**
         * Will return true if the user is authenticated and false
         * if error is thrown or password is incorrect. An error will be
         * logged to console with the corresponding error message (ie if mongo connection time out)
         * @param loginData
         * @returns {Promise.<T>}
         */
        login: (loginData) => {
            return findUserExists(loginData)
            .then((aUserCursor) => {
                //console.log("got the ursosr");
                "use strict";
                return confirmPassword(aUserCursor, loginData);
            }).then((aBoolean) => {
                "use strict"
                return aBoolean;
            });
        },
        userExists: findUserExists
    };
};