//var url = "http://localhost:8060/posts";
var url = "https://udaiveer.me/posts";

$(window).load(function() {
  console.log('window loaded');
  $.get(url, function( data ) {
    console.log(data);
    var blogs = groupByYear(data);
    appendBlogs(blogs);
    console.log(blogs);
  });

});


function appendBlogs(blogs) {
  var blogsContainer = $('#blogs');

  var keys = Object.keys(blogs);
  keys.sort(function(elem1, elem2) {
    if(elem1 > elem2) {
      return -1;
    } else if(elem1 < elem2) {
      return 1;
    } else {
      return 0;
    }
  });

  keys.forEach(function(dateKey) {
    var time = '<div class="row">' +
      '<div class="year col-xs-offset-1 col-md-offset-2 col-md-10 col-xs-11">' + dateKey + '</div>' +
      '</div>';
    $(blogsContainer).append(time);
    if (blogs.hasOwnProperty(dateKey)) {
      blogs[dateKey].forEach(function (elem) {
        var blogEntry = "<div class=\"row blog-entry\">" +
                          "<div class=\"col-xs-offset-1 col-md-offset-2 col-xs-11 col-md-6\">" +
                            "<a href=\"" + elem.url + "\">" +
                              elem.title +
                            "</a>" +
                          "</div>" +
                        "<div class=\"visible-lg col-lg-2 time\"><span>" + elem.date + "</span></div>" +
                        "</div>";
        $(blogsContainer).append(blogEntry);
      });
    }
  });
}

/**
 * Takes in an array of blog entries sorted by date
 * with and return an object where
 * the date is the key and it points to an array of blog entries for that date
 * {
 *  2015: [{entry1},{entry2},{entry3}],
 *  2016: [{entry1},{entry2},{entry3}],
 *  }
 * @param data
 * @returns {{}}
 */
function groupByYear(data) {
  var currYear = new Date().getFullYear() + "";
  var yearRegx = /(\d){4}/;
  var blogsByYear = {};
  data.forEach(function(elem) {
    var yearArray = yearRegx.exec(elem.date);
    if(yearArray == null) {
      elem.date = elem.date + ", " + currYear;
    }
    var year = String((yearArray && yearArray[0])  || currYear);
    if(!this.hasOwnProperty(year)) {
      this[year] = [];
      this[year].push(elem);
    } else {
      this[year].push(elem);
    }
  }.bind(blogsByYear));
  return blogsByYear;
}
