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

  $('.close').on('click', function() {
    deselect($('#signup'));
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

  $('.close2').on('click', function() {
    deselect($('#jwtValue'));
    return false;
  });
});

$.fn.slideFadeToggle = function(easing, callback) {
  return this.animate({ opacity: 'toggle', height: 'toggle' }, 
    'fast', easing, callback);
};


