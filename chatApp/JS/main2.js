// used to toggle login/logout buttons in modal
var __ISLOGGEDIN = false;
// used to keep track of current user name
var __USER = 'Guest';

var activeUsers = 0;
// socket.io endpoint
var suffix = '/socket.io/socket.io.js';

var servo = 'chat.udaiveer-me.io';
//var servo = '';
//var host = 'localhost';
//socket up URI
var ip = 'https://' + (servo||host);
//var ip = 'http://' + (servo||host);

/**
 * Try to conenct to socke.io
 * the io object is defined in the socket.io script
 */
try {
    var socket = io.connect(ip, {secure: true});
    //var socket = io.connect(ip);
} catch(std) {
    // set status to warn user
    //console.log("not connected");
}


/**
 * Function so stop some funky scrolling on mobile
 */
$(window).scroll(
        function() {
          if ($(window).scrollTop() + $(window).height() > $(document).height()) return;
      }
);

if(socket !== undefined) {
    // fetch all live users
    socket.emit('fetch-login-list');
    // register the callback for displaying all messages
    socket.on('output', function(data) {
        data.forEach(function(elem) {
            //console.log(elem);
            appendComment(elem.user , elem.msg, elem.avatar, elem.time);
        });
    });

    //callback to get list of all current users online
    socket.on("login-list", function(datum) {
        console.log("client connected: login list [");
        for (var elem in datum) {
            var liveUser = $('#' + datum[elem].username);
            if(liveUser) {
                if (liveUser.length === 0) {
                    $('.active-user-row').append(generateUserNode(datum[elem].username, datum[elem].avatar));
                    activeUsers++;
                    updateActiveUsers(activeUsers);
                }
                console.log(elem);
            }
        }
        console.log("]");
    });

    //when client logs-in
    socket.on("client-login", function(elem){
        console.log("client logged in");
        if(elem.username) {
            var liveUser = $('#' + elem.username);

            if (liveUser.length === 0) {
                $('.active-user-row').append(generateUserNode(elem.username, elem.avatar));
                activeUsers++;
                updateActiveUsers(activeUsers);
            }
            console.log(elem);
        }
    });

    //callback when client logs out
    socket.on("client-logout", function(elem) {
        var userNode = $('#' + elem);
        if(userNode.length >= 1) {
            $(userNode).remove();
            activeUsers--;
            updateActiveUsers(activeUsers);
        }
        console.log(elem);
    });

    // client has logged out in browser and now all tabs in
    // browser must validate
    socket.on("client-invalidate", function() {
        //will check current session
        var checkValidSession = true;
        autolog(checkValidSession);
    });

}

function updateActiveUsers() {
    $('#active-users-number').html(activeUsers);
}

function generateUserNode(userID, userAvatar) {
    return  '<div ' + 'id="'+ userID+ '" ' + 'class="active-user col-xs-12">' +
                '<div class="hidden-xs pull-left a-user-avatar vertical-align-div">'+
                    '<img src="' + (userAvatar || 'https://avatars2.githubusercontent.com/u/12993700?v=3&s=460') +
                        '" alt="avatar">' +
                '</div>' +
                '<div class="a-user pull-left vertical-align-div">' +
                    '<span>' + userID +'</span>' +
                '</div>' +
                '<div class="hidden-xs a-user-ball pull-right vertical-align-div">' +
                    '<svg  height="20" width="20">' +
                        '<circle cx="10" cy="10" r="5" stroke="none" fill="#A8C65D" > </circle>'+
                    '</svg>'+
                '</div>' +
            '</div>';
}


/**
 * Called each time user is successfully logged in.
 * @param username
 */
function emitLogin(username) {
    var userJWT = getJWT();
    if(userJWT != null) {
        var userObj = JSON.parse(atob(userJWT.jwt.split(".")[1]));
        socket.emit('login', {username: username, avatar: userObj.avatar});
    }
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

$('#message-button').on('touchstart click', function(event) {
    if (__ISLOGGEDIN === true) {
        emitComment(event);
    } else {
        appendComment("server>>", "must login to comment");
        this.value = "";
    }

    this.blur();
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
            crossDomain: true,
            contentType: 'application/json',
            url: ip + '/api/auth/',                     //endpoint for JWT auth
            success: function (data) {
                //console.log('jwt authenticated');
                var jwt = data.jwt.split(".");
                //console.log(jwt);
                __USER = JSON.parse(atob(jwt[1])).username; //save username
                __ISLOGGEDIN = true;                        // set logged in flag
                localStorage.setItem('jwt', JSON.stringify(data));  //set JWT

                //to gracefully check validity of session
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

                //JWT should be gone, but if it is delayed
                /**
                 * user has logged out in browser and now force all open connection to reload.
                 * Reload will destroy all unused socket.io socket connection in the backend
                 * that were registered to the used in the current session on specific browser.
                 */
                if(checkValidSession) {
                    location.reload();
                }
            }
        });
    } else {

        // JWT should not be present and a forced reload across all tabs will
        // destroy the connection associated with this session in backend
        // which were stored in sockets list
        if(checkValidSession) {
            location.reload();
        }

        if(!__ISLOGGEDIN) {
            __USER = "Guest";
            loggedOut();
        }
    }

}

$(autolog());

// displaying JWT on an interval -- not relevent to project anymore
//setInterval(function() { $('#jwt').text(JSON.stringify(getJWT() || "no value avaliable"));}, 5000);

$('#logout').on('touchstart click', function(event) {
    emitLogout();
    //appendComment("server>>", "you are now logged out");
    __ISLOGGEDIN = false;
    __USER = "Guest";
    loggedOut();
    this.blur();
    $('#myModal').modal('hide');
    event.preventDefault();
});

$('#login').on('touchstart click', function(event) {
        if(__ISLOGGEDIN === false) {
        var user = $('#username').val();
        var pass = $('#password').val();
        var regx =  /^[a-zA-z0-9]{5,10}$/;

        var data = {username: user, password: pass};
        if(user.match(regx)) {
            $.ajax({
                    type: 'POST',
                    data: JSON.stringify(data),
                    crossDomain: true,
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
                        formValidation("danger", 'invalid username or password');
                        loggedOut();
                    }
            });
        } else {
            formValidation("danger", 'invalid username or password');
        }

    }

    $('#username').val('');
    $('#password').val('');
    this.blur();
    event.preventDefault();
});

$('#sign-up').on('touchstart click', function(event) {
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
                    crossDomain: true,
                    url: ip + '/api/signup/',
                    success: function(data) {
                        //console.log('signup success');
                        //appendComment("server>>","Account has been created now you can login");
                        //console.log(data);
                        //deselect($('#signup'));
                        __ISLOGGEDIN = false;
                        $('#username').val('');
                        $('#password').val('');
                        formValidation("success", "account created! you can now login")
                        loggedOut();
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //appendComment("server>>","Account has been taken");
                        $('#username').val('');
                        $('#password').val('');
                        __ISLOGGEDIN = false;
                        loggedOut();
                        formValidation("warning" ,'account already exists');
                    }
            });
        } else {
            formValidation("danger",'invalid username');
        }

    this.blur();
});

/**
 * usr is the username  sanitized in the emitComment function
 * str is the message which was sanitized in emit comment function
 * and send to database and retrieved back
 * @param usr
 * @param str
 * @param randomAvatar - avatar url generate by backend
 * @param time - the time of the comment
 */
function appendComment(usr,str, randomAvatar, time) {
    function encodeHTML(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
    usr = addSlashes(usr);
    if(str == null || !str) str = "Message must have gotten lost in the Internets =(";
    str = encodeHTML(str);
    var defaultAvatar = "https://avatars2.githubusercontent.com/u/12993700?v=3&s=460"; // just a backup url
    var room = $('.messages-container');
    var comment = $('<div class="message wordwrap">' +
                            '<div class="time-stamp">' +
                                '<span class="time-stamp">' + (time ||getTime())  +'</span>' +
                            '</div>' +
                            '<div class="pull-left a-user-avatar-message">' +
                                '<div '+ ' id="user-logo-div">' +
                                    '<img src='+ '\"' + (randomAvatar || defaultAvatar) + '\"' + ' alt="avatar">' +
                                    '<br>' +
                                    '<div class="username"><span>' + usr  + '</span></div>'+
                                '</div>' +
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
            title: title,
            time: getTime()
        });
    }

    message = textArea.val('');
}

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

function getTime() {
    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var dL = [  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var d = new Date();
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
    if (h === 0) {
        h = 12;
    }
    m = m<10?"0"+m:m;

    s = s<10?"0"+s:s;

    /* if you want 2 digit hours: */
    h = h<10?"0"+h:h;

    return mL[d.getMonth()] + " " + dL[d.getDay()] + " " + h+":"+m+":"+s+" "+dd;
}

function loggedOut() {
    updateDisplays(false);


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
    var formCodes = {danger: "danger", success: "success", warning: "warning"};
    var formAlert = $('#form-alert');
    if(formAlert.length >= 1) {
        formAlert.removeClass();
        formAlert.addClass("alert alert-" + (formCodes[messageCode]|| "info" ) );
        formAlert.text(message);
        $(formAlert).show();
    }
}

function clearValidation() {
    var formAlert = $('#form-alert');
    if(formAlert.length >=1) {
        $(formAlert).hide();
    }
}

// clear all messages when closed
$('#myModal').on('hidden.bs.modal', function () {
    clearValidation();
});



function addSlashes(string) {
    return string.replace(/\\/g, '\\\\').
    replace(/\u0008/g, '\\b').
    replace(/\t/g, '\\t').
    //replace(/\n/g, '\n').
    replace(/\f/g, '\\f').
    replace(/\r/g, '\\r').
    replace(/'/g, '\\\'').
    replace(/"/g, '\\"');
}
