//var ip = '54.183.2.118:9000';

var __ISLOGGEDIN = false;
var __USER = '';

var suffix = '/socket.io/socket.io.js';
var host = 'localhost';
//var servo = '54.153.87.38';
var servo = '';
var ip = 'http://' + (servo||host) + ':9000';
//auto-login 
function autolog() {
    if(getJWT() !== null) {
        $.ajax({
                type: 'POST',
                data: JSON.stringify(getJWT()),
                contentType: 'application/json',
                url: ip + '/api/auth/',                      
                success: function(data) {
                    console.log('jwt authenticated');
                    var jwt = data.jwt.split(".");
                    console.log(jwt);
                    __USER = JSON.parse(atob(jwt[1])).username; 
                    __ISLOGGEDIN = true;                    
                    //set the uername
                   localStorage.setItem('jwt',JSON.stringify(data)); 
                    $('#login1').hide();
                    $('#logout-container').show();
                },error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    __ISLOGGEDIN = false;                    
                    appendComment("server>>","Incorrect jwt signature ");
                    removeJWT();
                    $('#login1').show();
                    $('#logout-container').hide();
                } 
            });
    } 

    if(__ISLOGGEDIN === false) {
        $('#login1').show();
        $('#logout-container').hide();
    }
}
$(autolog());


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


//logout 
$('#logout-form').submit(function(event) {
    removeJWT(); 
    appendComment("server>>", "you are now logged out");
    __ISLOGGEDIN = false;
    $('#login1').show();
    $('#logout-container').hide();
    event.preventDefault();
});

//login  
//tested > alone(w/no token in storage)
//test> [bad input]  [passed] 
//test> [taken account]   [passed] 
//test> [valid signup]   [passed] 
$('#login').submit(function(event) {
    if(__ISLOGGEDIN === false) {
        var user = $('#User').val();
        var pass = $('#password').val();
        var regx =  /^[a-zA-z0-9]{5,12}$/; 
        
        var data = {username: user, password: pass};
        if(user.match(regx) && pass.match(regx)) {
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
                        $('#login1').hide();
                        $('#logout-container').show();
                       localStorage.setItem('jwt',JSON.stringify(data)); 
                       appendComment("server>>", "JWT is now stored in local storage");
                       appendComment("server>>", "close tabs and try to log in again or open a new tab while logged in");
                    },error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        appendComment("server>>","Incorrect login information");
                        __ISLOGGEDIN = false;                    
                        $('#login1').show();
                        $('#logout-container').hide();
                    } 
                    
            });
        } else {
            alert('must be letter and numbers 5 <= len <= 12');
        }
    }

    $('#User').val('');
    $('#password').val('');
    event.preventDefault();
});

//signup
//test> [bad input]  [passed] 
//test> [taken account]   [passed] 
//test> [valid signup]   [passed] 
$('#signup-form').submit(function(event) {
    if($(this).attr('value') === 'cancle') {
        event.preventDefault();
        console.log('deselecting');
        deselect($('#signup'));
        return false;
    }
        var user = $('#regUname').val();
        var pass = $('#regPassword').val();
        var regx =  /^[a-zA-z0-9]{5,12}$/; 
         
        var data = {username: user, password: pass};
        if(user.match(regx) && pass.match(regx)) {
            $.ajax({
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    url: ip + '/api/signup/',                      
                    success: function(data) {
                        console.log('signup success');
                        appendComment("server>>","Account has been created now you can login");
                        console.log(data);
                        deselect($('#signup'));
                        __ISLOGGEDIN = false;                    
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        appendComment("server>>","Account has been taken");
                        __ISLOGGEDIN = false;                    
                    }       
            });
        } else {
            alert('must be letter and numbers 5 <= len <= 12');
        }

        $('#User').val('');
        $('#password').val('');
    
    event.preventDefault();
    return false;
});

//remove JWT
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

//add comment to local
function appendComment(usr,str) {
    console.log('appending in appendComment ' + str);
    console.log(usr);
    var room = $('#central_room'); 
    var comment = $('<div class="lineA"> <span class="timestamp">10:12</span> <span class="user">server</span> <span class="message"></span> </div>');
    var user = comment.find('.user').text(usr || "server>");
    var cmtStr = comment.find('.message').text(str);
    var time = comment.find('.timestamp').text(getTime());
    room.append(comment); 
    room.scrollTop(room.last()[0].scrollHeight);
} 

//enter command for comments
$('#inputline').keydown(function(event) {
    if (event.keyCode == 13) {
        if(this.value !== "") {
            if(__ISLOGGEDIN === true) {
                    emmitComment(event);
            } else {
                appendComment("server>>", "must login to comment");
                this.value = "";
            }
        }
        event.preventDefault();
        return false;
     }
}).focus(function(){
    if(this.value == "Write your comment here..."){
        this.value = "";
    }
}).blur(function(){
    if(this.value ===""){
         this.value = "Write your comment here...";
    }
});


function getTime() {
        var today=new Date();
        return today.format();
}

function emmitComment(event){
    var message = $('#inputline').val();
    socket.emit('input', {
        msg: message, jwt: 'sample-jwt', user : (__USER || "admin")
    });
    message = $('#inputline').val('');
}
