//var ip = '54.183.2.118:9000';
var ip = '127.0.0.1:8080';
var suffix = '/socket.io/socket.io.js';
try {
    var socket = io.connect('http://'+ ip);
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

    if(user.match(regx) && pass.match(regx)) {
        alert('login valid' + user + " " + pass);
    } else {
        alert('must be letter and numbers 5 <= len <= 12');
    }

    $('#User').val('');
    $('#password').val('');
    event.preventDefault();
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
