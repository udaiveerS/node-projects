$(window).load(function() {
  $('.custom-nav a').each(function() {
    console.log(this);
    $( this ).removeClass('active');
  });
  if(window.location.pathname === '/') {
   $('#home').addClass('active');
  }
  if(window.location.pathname === '/projects') {
    $('#projects').addClass('active');
  }
});