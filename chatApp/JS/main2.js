// used to toggle login/logout buttons in modal
var __ISLOGGEDIN = false;
// used to keep track of current user name
var __USER = 'Guest';

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
    //console.log("not connected");
}


if(socket !== undefined) {
    //console.log("ok");

    // register the callback for displaying all messages
    socket.on('output', function(data) {
        data.forEach(function(elem) {
            //console.log(elem);
            appendComment(elem.user , elem.msg, elem.avatar);
        });
    });

    //callback to get list of all users online
    socket.on("login-list", function(datum) {
        console.log("client connected: login list [");
        for (var elem in datum) {
            console.log(elem);
        }
        console.log("]");
    });

    //when client logs-in
    socket.on("client_login", function(elem){
            console.log("client logged in");
            console.log(elem);
    });

    //callback when client logs out
    socket.on("client-logout", function(elem) {
        console.log("logout");
        console.log(elem);
    });

    socket.on("client-invalidate", function() {
        //will check current session
        var checkValidSession = true;
        autolog(checkValidSession);
    });

} else {
        //console.log("not ok");
}

/**
 * Called each time user is successfully logged in.
 * @param username
 */
function emitLogin(username) {
    socket.emit('login', {username: username});
}

/**
 * Only called when user clicks logout
 * changes state of server loginList object
 */
function emitLogout() {
    var userJWT = getJWT();
    if(userJWT != null) {
        var userObj = JSON.parse(atob(userJWT.jwt.split(".")[1]));
        socket.emit('logout', {username: userObj.username});
        removeJWT();
    }
}

$('#message-button').click(function(event) {
    if (__ISLOGGEDIN === true) {
        emitComment(event);
    } else {
        appendComment("server>>", "must login to comment");
        this.value = "";
    }

    event.preventDefault();
    return false;
});

/**
 * Auto login script check if JWT is saved authenticates
 * the JWT in local storage and logs user in and
 * toggles login/signup button also used to check
 * if user can be to check session authenticity and
 * presence of JWT
*/
function autolog(checkValidSession) {
    if (getJWT() !== null) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(getJWT()),
            contentType: 'application/json',
            url: ip + '/api/auth/',                     //endpoint for JWT auth
            success: function (data) {
                //console.log('jwt authenticated');
                var jwt = data.jwt.split(".");
                //console.log(jwt);
                __USER = JSON.parse(atob(jwt[1])).username; //save username
                __ISLOGGEDIN = true;                        // set logged in flag
                localStorage.setItem('jwt', JSON.stringify(data));  //set JWT

                if(checkValidSession) {
                    loggedIn();
                } else {
                    emitLogin(__USER);
                    loggedIn();
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                __ISLOGGEDIN = false;
                __USER = "Guest";
                removeJWT();
                loggedOut();
                if(checkValidSession) {
                    location.reload();
                }
            }
        });
    }

    if(!__ISLOGGEDIN) {
        __USER = "Guest";
        loggedOut();
    }
}

$(autolog());

// displaying JWT on an interval -- not relevent to project anymore
//setInterval(function() { $('#jwt').text(JSON.stringify(getJWT() || "no value avaliable"));}, 5000);

$('#logout').click(function(event) {
    emitLogout();
    //appendComment("server>>", "you are now logged out");
    __ISLOGGEDIN = false;
    __USER = "Guest";
    loggedOut();
    this.blur();
    $('#myModal').modal('hide')
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
                        //console.log('success');
                        //console.log(data);
                        __ISLOGGEDIN = true;
                        var jwt = data.jwt.split(".");
                        __USER = JSON.parse(atob(jwt[1])).username;
                       localStorage.setItem('jwt',JSON.stringify(data));
                        loggedIn();
                        emitLogin(__USER);
                        $('#myModal').modal('hide');
                       //appendComment("server>>", "JWT is now stored in local storage");
                       //appendComment("server>>", "close tabs and try to log in again or open a new tab while logged in");
                    },error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //appendComment("server>>","Incorrect login information");
                        __ISLOGGEDIN = false;
                        __USER = "Guest";
                        loggedOut();
                        alert('invalid username or password');
                    }
            });
        } else {
            alert('invalid username or password');
        }

    }

    $('#username').val('');
    $('#password').val('');
    this.blur();
    event.preventDefault();
});

$('#sign-up').click(function(event) {
        event.preventDefault();
        var user = $('#username').val();
        var pass = $('#password').val();
        var regx =  /^[a-zA-z0-9]{5,10}$/;

        var data = {username: user, password: pass};
        if(user.match(regx)) {
            $.ajax({
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    url: ip + '/api/signup/',
                    success: function(data) {
                        //console.log('signup success');
                        //appendComment("server>>","Account has been created now you can login");
                        //console.log(data);
                        //deselect($('#signup'));
                        __ISLOGGEDIN = false;
                        $('#username').val('');
                        $('#password').val('');
                        alert("account created! you can now login")
                        loggedOut();
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //appendComment("server>>","Account has been taken");
                        $('#username').val('');
                        $('#password').val('');
                        __ISLOGGEDIN = false;
                        loggedOut();
                        alert('account exists');
                    }
            });
        } else {
            alert('invalid username or account exists');
        }

    this.blur();
});



function removeJWT() {
    if(localStorage.getItem("jwt") !== null) {
        localStorage.removeItem('jwt');
    }
}

function getJWT() {
    if(localStorage.getItem("jwt") !== null) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return null;
    }
}


function addSlashes(string) {
    return string.replace(/\\/g, '\\\\').
    replace(/\u0008/g, '\\b').
    replace(/\t/g, '\\t').
    replace(/\n/g, '\\n').
    replace(/\f/g, '\\f').
    replace(/\r/g, '\\r').
    replace(/'/g, '\\\'').
    replace(/"/g, '\\"');
}

/**
 * usr is the username  sanitized in the emitComment function
 * str is the message which was sanitized in emit comment function
 * and send to database and retrieved back
 * @param usr
 * @param str
 * @param randomAvatar - avatar url generate by backend
 */
function appendComment(usr,str, randomAvatar) {
    usr = addSlashes(usr);
    //console.log('appending in appendComment ' + str);
    //console.log(usr);
    if(str == null || !str) str = "Message must have gotten lost in the Internets =(";

    var defaultAvatar = "https://avatars2.githubusercontent.com/u/12993700?v=3&s=460"; // just a backup url
    var room = $('.messages-container');
    var comment = $('<div class="message wordwrap">' +
                            '<div class="time-stamp">' +
                                '<span class="time-stamp">' + getTime()  +'</span>' +
                            '</div>' +
                            '<div class="pull-left a-user-avatar-message">' +
                                '<img src='+ '\"' + (randomAvatar || defaultAvatar) + '\"' + ' alt="avatar">' +
                                '<br>' +
                                '<div class="username">' + usr  + '</div>'+
                            '</div>' +
                            '<div class="message-string pull-right">' +
                                '<span>' + str + '</span>' +
                            '</div>' +
                            '<div class="clearfix"></div>' +
                    '</div>'
    );
    room.append(comment);
    room.scrollTop(room.last()[0].scrollHeight);
}

function emitComment(event) {
    var textArea = $('#message-form');
    var message = textArea.val();
    message = addSlashes(message);
    __USER = addSlashes(__USER);
    var userJWT = getJWT();
    if(userJWT !== null) {
        var userObj = JSON.parse(atob(userJWT.jwt.split(".")[1]));
        var avatar = userObj.avatar;
        var title  = userObj.title ;
    }

    if(message !== "") {
        socket.emit('input', {
            msg: message,
            jwt: (userJWT.jwt || "none"),
            user: (__USER || "admin"),
            avatar: avatar,
            title: title
        });
    }

    message = textArea.val('');
}

function getTime() {
        var today=new Date();
        return today.format();
}

function loggedOut() {
    updateDisplays(false);

    var userJWT = getJWT();

   if (__USER !== "") {
        __USER = "";
    }

    removeJWT();
    $('.form-group').show();
    $('#login').show();
    $('#logout').hide();
    $('#sign-up').show();
}

function loggedIn() {
    updateDisplays(true);
    $('.form-group').hide();
    $('#login').hide();
    $('#logout').show();
    $('#sign-up').hide();
}

function updateDisplays(isLogged){
    if(isLogged) {
        var userJWT = getJWT();
        var userObj = JSON.parse(atob(userJWT.jwt.split(".")[1]));
        $(".username-title").text(userObj.title);
        $(".username-display").text(userObj.username);
    } else {
        $(".username-title").text("Anonymous User");
        $(".username-display").text("Guest");
    }
}

function formValidation(messageCode, message) {
    var formCodes = {danger: "danger", success: "success", warning: "warning"}
    var formAlert = $('#form-alert');
    $(formAlert).show();
    formAlert.removeClass();
    formAlert.addClass("alert alert-" + (formCodes[messageCode]|| "info" ) );
    formAlert.text(message);
}

function clearValidation() {
    var formAlert = $('#form-alert');
    $(formAlert).hide();
}


function addSlashes(string) {
    return string.replace(/\\/g, '\\\\').
    replace(/\u0008/g, '\\b').
    replace(/\t/g, '\\t').
    replace(/\n/g, '\\n').
    replace(/\f/g, '\\f').
    replace(/\r/g, '\\r').
    replace(/'/g, '\\\'').
    replace(/"/g, '\\"');
}
