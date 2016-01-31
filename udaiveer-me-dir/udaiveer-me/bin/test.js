var fs = require('fs');
var page = require('webpage').create();
page.open('https://medium.com/@uda/latest?count=1000', function(status) {
    function writePage() {
        var html = page.evaluate(function () {
            var root = document.getElementsByTagName("html")[0];
            var html = root ? root.outerHTML : document.body.innerHTML;
            return html
        });
        try {
            fs.write("medium.txt", html, 'w');
        } catch (e) {
            console.log(e);
        }
        phantom.exit();
    }
    setTimeout(writePage, 1000);
});
