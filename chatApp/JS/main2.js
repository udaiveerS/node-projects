// used to toggle login/logout buttons in modal
var __ISLOGGEDIN = false;
// used to keep track of current user name
var __USER = '';

// socket.io endpoint
var suffix = '/socket.io/socket.io.js';

//var servo = '54.183.2.118';
var servo = '';
var host = 'localhost';
//socket up URI
var ip = 'http://' + (servo||host) + ':9000';

/**
 * Try to conenct to socke.io
 * the io object is defined in the socket.io script
 */
try {
    var socket = io.connect(ip);
} catch(std) {
    // set status to warn user
    console.log("not connected");
}

if(socket !== undefined) {
    console.log("ok");

    socket.on('output', function(data) {
        data.forEach(function(elem) {
            console.log(elem);
            appendComment(elem.user + ' →', elem.message);
        });
    });

} else {
    console.log("not ok");
}

/**
 * Auto login script check if JWT is saved authenticates
 * the JWT in local storage and logs user in and
 * toggles login/signup button
*/
function autolog() {
    if(getJWT() !== null) {
        $.ajax({
                type: 'POST',
                data: JSON.stringify(getJWT()),
                contentType: 'application/json',
                url: ip + '/api/auth/',                     //endpoint for JWT auth
                success: function(data) {
                    console.log('jwt authenticated');
                    var jwt = data.jwt.split(".");
                    console.log(jwt);
                    __USER = JSON.parse(atob(jwt[1])).username; //save username
                    __ISLOGGEDIN = true;                        // set logged in flag
                   localStorage.setItem('jwt',JSON.stringify(data));  //set JWT
                    $('#login').hide();
                },error: function(XMLHttpRequest, textStatus, errorThrown) {
                    __ISLOGGEDIN = false;
                    appendComment("server>>","Incorrect jwt signature");
                    removeJWT();
                }
            });
    }
}

$(autolog());

// displaying JWT on an interval -- not relevent to project anymore
//setInterval(function() { $('#jwt').text(JSON.stringify(getJWT() || "no value avaliable"));}, 5000);



