//var ip = '54.183.2.118:9000';
var suffix = '/socket.io/socket.io.js';
var host = 'localhost';
var servo = '54.153.87.38';
//var servo = '';
var ip = 'http://' + (servo||host) + ':9000';

console.log('the ip is' + ip);
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
            appendComment(elem.message);
        });
    });
        
} else {
    console.log("not ok");
}

$('#inputline').keydown(function(event) {
    if (event.keyCode == 13) {
        if(this.value !== "") {
            emmitComment(event);
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

//login 
$('#login').submit(function(event) {
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
                }
        });
    } else {
        alert('must be letter and numbers 5 <= len <= 12');
    }

    $('#User').val('');
    $('#password').val('');
    event.preventDefault();
});

$('#signup-form').submit(function(event) {
    var user = $('#regUname').val();
    var pass = $('#regPassword').val();
    var regx =  /^[a-zA-z0-9]{5,12}$/; 
     
    event.preventDefault();
    var data = {username: user, password: pass};
    if(user.match(regx) && pass.match(regx)) {
        $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: ip + '/api/signup/',                      
                success: function(data) {
                    console.log('signup success');
                    console.log(data);
                }
        });
    } else {
        alert('must be letter and numbers 5 <= len <= 12');
    }

    $('#User').val('');
    $('#password').val('');
});



function appendComment(str) {
    console.log('appending ' + str);
    var room = $('#central_room'); 
    var comment = $('.lineA:first').clone();
    var cmtStr = comment.find('.message').text(str);
    room.append(comment); 
}
 
function emmitComment(event){
    var message = $('#inputline').val();

    socket.emit('input', {
        msg: message, jwt: 'sample-jwt'
    });

    console.log(message); 
    message = $('#inputline').val('');
}
