$(window).load(function() {
    if(window.location.pathname === "/") {
        $("#home").addClass("active");
    } else{
        $("#about").addClass("active");
    }
});
