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

    // register the callback for displaying all messages
    // when a user logs in
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
    if (getJWT() !== null) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(getJWT()),
            contentType: 'application/json',
            url: ip + '/api/auth/',                     //endpoint for JWT auth
            success: function (data) {
                console.log('jwt authenticated');
                var jwt = data.jwt.split(".");
                console.log(jwt);
                __USER = JSON.parse(atob(jwt[1])).username; //save username
                __ISLOGGEDIN = true;                        // set logged in flag
                localStorage.setItem('jwt', JSON.stringify(data));  //set JWT
                $('#login').hide();
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                __ISLOGGEDIN = false;
                $('#logout').hide();
                //appendComment("server>>", "Incorrect jwt signature");
                removeJWT();
            }
        });
    }
}


//$(autolog());

// displaying JWT on an interval -- not relevent to project anymore
//setInterval(function() { $('#jwt').text(JSON.stringify(getJWT() || "no value avaliable"));}, 5000);

$('#logout').click(function(event) {
    //removeJWT();
    //appendComment("server>>", "you are now logged out");
    //__ISLOGGEDIN = false;
    //$('#login').show();
    event.preventDefault();
});

$('#login').click(function(event) {
        if(__ISLOGGEDIN === false) {
        var user = $('#username').val();
        var pass = $('#password').val();
        var regx =  /^[a-zA-z0-9]{5,10}$/;

        var data = {username: user, password: pass};
        if(user.match(regx)) {
            $.ajax({
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    url: ip + '/api/login/',
                    success: function(data) {
                        console.log('success');
                        console.log(data);
                        __ISLOGGEDIN = true;
                        var jwt = data.jwt.split(".");
                        __USER = JSON.parse(atob(jwt[1])).username;
                        console.log(__USER);
                        $('#login').hide();
                       localStorage.setItem('jwt',JSON.stringify(data));
                       //appendComment("server>>", "JWT is now stored in local storage");
                       //appendComment("server>>", "close tabs and try to log in again or open a new tab while logged in");
                    },error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //appendComment("server>>","Incorrect login information");
                        __ISLOGGEDIN = false;
                        $('#login').show();
                        $('#logout').hide();
                        alert('invalid username or password');
                    }
            });
        } else {
            alert('invalid username or password');
        }
    }

    $('#username').val('');
    $('#password').val('');
    event.preventDefault();
});

$('#sign-up').click(function(event) {
    console.log(this.value);
    event.preventDefault();
});
