$('#inputline').keydown(function(event) {
    if (event.keyCode == 13) {
        if(this.value !== "") {
            addComment(event);
        }
        event.preventDefault();
        return false;
     }
}).focus(function(){
    if(this.value == "Write your comment here..."){
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


function addComment(event){
    room = $('#central_room'); 
    message = $('#inputline').val();
    console.log(message); 
    comment = $('.lineA:first').clone();
    comment.find('.message').text(message);
    room.append(comment); 
    message = $('#inputline').val('');
}
