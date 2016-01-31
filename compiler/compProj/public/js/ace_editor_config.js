var editor = ace.edit("editor");

var url = 'https://compiler.udaiveer-me.io/compile';
//var url = 'http://localhost:8040/compile';

var userPrograms;

var opts = {
    lines: 13 // The number of lines to draw
    , length: 28 // The length of each line
    , width: 5 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 0.25 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#000' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'relative' // Element positioning
};


$(window).load(function() {
    editor.$blockScrolling = Infinity;
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setUseWorker(false);
    editor.getSession().setUseWrapMode(true);
    editor.setOptions({
        maxLines: 23,
        minLines: 23
    });
    editor.session.setValue(programs.simple);
    userPrograms = $.extend(true, {}, programs);
    console.log(userPrograms);
});


//set values of the when button is clicked
$(window).load(function() {
    $('#option1').click(function() {
        editor.session.setValue(userPrograms.simple);
    });
    $('#option2').click(function() {
        editor.session.setValue(userPrograms.fib);
    });
    $('#option3').click(function() {
        editor.session.setValue(userPrograms.euler);
    });
    $('#option4').click(function() {
        editor.session.setValue(userPrograms.ifs);
    });
    $('#option5').click(function() {
        editor.session.setValue(userPrograms.recursion);
    });
});



$(window).load(function() {
    var compileOut = $('#compiler-output');
    var jasminOut = $('#jasmin-output');

    $('#save').click(function() {
        var prgmId = $('input[name=options]:checked', '.btn-programs-group').val();
        console.log(prgmId);
        userPrograms[prgmId] = editor.session.getValue();
    });
    $('#compile').click(function() {
        var prgmId = $('input[name=options]:checked', '.btn-programs-group').val();
        console.log(prgmId);
        console.log("compiling");
        var obj = {txt: editor.session.getValue()};
        var compileButton = this;
        $(compileButton).prop('disabled', true);

        compileOut.html('');
        jasminOut.html('');

        var spinner1 = new Spinner(opts).spin();
        var spinner2 = new Spinner(opts).spin();
        $(compileOut).append(spinner1.el);
        $(jasminOut).append(spinner2.el);
        $.ajax({
            type: "POST",
            url: url,
            data: obj,
            crossDomain: true,
            success: function(data, status, xhr) {
                console.log(status);
                console.log(data);
                $(compileButton).prop('disabled', false);
                // make the user appreciate the spinners
                sleep(2000);
                spinner1.stop();
                spinner2.stop();
                updateOutput(data);
            },
            error: function(data, status, xhr) {
                console.log(status);
                console.log(data);
                $(compileButton).prop('disabled', false);
                // make the user appreciate the spinners
                sleep(2000);
                spinner1.stop();
                spinner2.stop();
                updateOutput(data);
            }
        });
});
    $('#reset').click(function() {
        var prgmId = $('input[name=options]:checked', '.btn-programs-group').val();
        userPrograms[prgmId] = programs[prgmId];
        editor.session.setValue(userPrograms[prgmId]);
        console.log(prgmId);
    });

    function updateOutput(obj) {
        try {
           obj = JSON.parse(obj);
        } catch(e) {
           obj = {out: "", err: "internal Server Error", j: "nothing was generated"};
        }
        var out = obj.out.replace(/\n/g, "<br />");
        var err = obj.err.replace(/\n/g, "<br />");
        var j = obj.j.replace(/\n/g, "<br />");
        compileOut.html(out + err);
        jasminOut.html(j);
    }
});

function sleep(ms) {
    var start = new Date().getTime(), expire = start + ms;
    while (new Date().getTime() < expire) { }
    return;
}

var programs = {"simple":"var t:number = 0;\nvar sum:number = 9;\n\nfunction doStuff2():void {\n\tsum = sum + t -4.032;\n\tprintln(\"in the function\");\n\tprintln(sum);\n\t\n}\n\ndoStuff2();\n\n\t\n\n","fib":"var first_fibo: number = 0;\nprintln(\"The first fibonacci number is: \");\nprintln(first_fibo);\n//calculates fibonacci numbers\n\nvar second_fibo: number = 1;\nprintln(\"The second fibonacci number is: \");\nprintln(second_fibo);\n\n\nvar limit: number = 100;\nvar curr_fib_count: number = 2;\nvar curr_fib_num: number = 0;\n//second_fibo = first_fibo + second_fibo;\n\nvar z: number = limit + limit;\n\n//while loops work as well to a certain degree \nwhile(curr_fib_count < limit) {\n    var this_fibo:number = first_fibo + second_fibo;\n    first_fibo = second_fibo;\n    second_fibo = this_fibo;\n    println(\"The next fibonacci number is: \");\n    println(this_fibo);\n    curr_fib_count = curr_fib_count+1;\n}\n    ","euler":"function tester(str:char, str2:char, x:number):number {\n    println(\"hello world\"); //prints can only print one argument at a time\n    var t:number = 4+5+3;\n    return t; //return dosent really work, but comments do =) \n}\n\n//This program finds the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.\n//the full description of the problem can be found at https://projecteuler.net/problem=6\nfunction sum_square_diff(): number {\n    var i:number = 1;\n    var sum:number = 0;\n    var square_sum:number = 0;\n    while(i <= 100) {\n        sum = sum + i;\n        var temp:number = i * i;\n        square_sum = square_sum + temp;\n        i = i + 1;\n    }\n    \n    var square_of_sum:number = sum * sum;\n    println(\"The sum of the squares is: \");\n    println(square_sum);\n    println(\"The square of the sum is: \");\n    println(square_of_sum);\n    println(\"The difference between the sum of the squares of the first one hundred natural numbers and the square of the sum is: \");\n    var result:number = square_of_sum - square_sum;\n    //println(result);\n    var expected_result:number = 25164150;\n    println(\"Expected result: \");\n    println(expected_result);\n    println(\"Result: \");\n    println(result);\n    \n    if(result == expected_result) {\n        println(\"test passed 1/1\");\n    } else {\n        println(\"test passed 0/1\");\n    }\n    return 0;\n}\n\nsum_square_diff();\n    ","ifs":"//less than tests \nvar wrong:number = 0; \nvar passed:number = 0;\n\nvar elseWrong :number = 0;\nvar elseCorrect :number = 0;\n\nif(1 < 1+3) {\n\tprintln(\"CORRECT: 1 < 4\");\n} else {\n\tprintln(\"Should not print 1 < 4\");\n\telseWrong = elseWrong + 1;\n}\n\nif(10 < 1+3) {\n\tprintln(\"WRONG: 10 < 4\");\n\twrong = wrong + 1;\n} else {\n\tprintln(\"Should Print else 10 < 4\");\n}\n\n\n//greater than tests \nif(10 > 1+3) {\n\tprintln(\"CORRECT: 10 > 4\");\n} else {\n\tprintln(\"Should not Print else 10 > 4\");\n\telseWrong = elseWrong + 1;\n}\n\nif(3 > 4) {\n\tprintln(\"WRONG: 3 > 4\");\n\twrong = wrong + 1;\n} else {\n\tprintln(\"Should Print 3 > 4\");\n}\n\n//greater than equal\nif(10 >= 1+3) {\n\tprintln(\"CORRECT: 10 >= 4\");\n}\n\nif(4 >= 4) {\n\tprintln(\"CORRECT: 4 >= 4\");\n}\n\nif(3 >= 4) {\n\tprintln(\"WRONG: 3 >= 4\");\n\twrong = wrong + 1;\n}\n\n//less than equal\nif(1 <= 1+3) {\n\tprintln(\"CORRECT: 1 <= 4\");\n}\n\nif(4 <= 3) {\n\tprintln(\"WRONG: 4 <= 3\");\n\twrong = wrong + 1;\n}\n\nif(0.11 <= 0.11) {\n\tprintln(\"CORRECT: 0.11 <= 0.11\");\n}else {\n\tprintln(\"Should NOT Print else 0.11 <= 0.11\");\n\telseWrong = elseWrong + 1;\n}\n\t\n\n//equality\n\nif(2.44 == 2.44) {\n\tprintln(\"CORRECT: 2.44 == 2.44\");\n} else {\n\tprintln(\"Should Not Print else\");\n\telseWrong = elseWrong + 1;\n}\n\nif(2.00 == 3.0) {\n\tprintln(\"WRONG: 2.0 == 4.0\");\n\twrong = wrong + 1;\n}\n\n\n//not equals \nif(2.44 != 2.44) {\n\tprintln(\"WRONG: 2.44 != 2.44\");\n\twrong = wrong + 1;\n} else {\n\tprintln(\"Should  Print else  2.44 != 2.44\");\n}\n\nif(2.00 != 3.0) {\n\tprintln(\"CORRECT: 2.0 != 3.0\");\n}\n\nprintln(\"\");\n\nprintln(\"Total IF tests:\"); \nprintln(14); \nprintln(\"IF test passed:\");\nvar result:number = 14 - wrong;  \nprintln(result); \n\nprintln(\"Total ELSE tests:\"); \nprintln(7); \nprintln(\"ELSE test passed:\");\nvar result2:number = 7 - wrong;  \nprintln(result2); \n\nprintln(\"-----------------\");\n\nprintln(\"Total test\");\nprintln(21);\nprintln(\"total test passed\");\nprintln(result + result2);","recursion":"var t:number = 0;\n\nfunction doStuff():void {\n    println(\"in the function\");\n    if(t >= 20) {\n        println(\"function finished\");\n    } else {\n        println(\"recursively t =\");\n    t = t + 1;\n    println(t);\n    doStuff();\n    }\n}\n\ndoStuff();\nprintln(\"function recursion expect t==20\");\nprintln(t);\n\nif(t == 20) {\n    println(\"t = 20 test passed\");\n} else {\n    println(\"t =\");\n    println(t);\n    println(\"test failed\");\n}\n    "};
