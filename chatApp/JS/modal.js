//messagepop signup
function deselect(e) {
  $('.pop').slideFadeToggle(function() {
    e.removeClass('selected');
  });    
}

$(function() {
  $('#signup').on('click', function() {
    if($(this).hasClass('selected')) {
      deselect($(this));               
    } else {
      $(this).addClass('selected');
      $('.pop').slideFadeToggle();
    }
    return false;
  });

  $('#close').on('click', function() {
    deselect1($('#signup'));
    return false;
  });
});

//messagepop2 JWT
function deselect2(e) {
  $('.pop2').slideFadeToggle(function() {
    e.removeClass('selected2');
  });    
}

$(function() {
  $('#jwtValue').on('click', function() {
    if($(this).hasClass('selected2')) {
      deselect2($(this));               
    } else {
      $(this).addClass('selected2');
      $('.pop2').slideFadeToggle();
    }
    return false;
  });

  $('#close2').on('click', function() {
    deselect2($('#jwtValue'));
    return false;
  });
});

$.fn.slideFadeToggle = function(easing, callback) {
  return this.animate({ opacity: 'toggle', height: 'toggle' }, 
    'fast', easing, callback);
};

/*
 * if drop downs are out of focous then close them
 */
$(document).on('click', function(event) {
    var hideSignup = $(event.target).closest('#sign-up-container').length;
    var hideJwt = $(event.target).closest('#jwt-container').length;
    if(hideSignup === 0 && $('#signup').hasClass('selected'))  {
        deselect($('#signup'));
    } 
    if(hideJwt === 0 && $('#jwtValue').hasClass('selected2')) {
        deselect2($('#jwtValue'));
    }
});

