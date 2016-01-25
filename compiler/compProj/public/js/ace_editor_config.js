var editor = ace.edit("editor");

var userPrograms;

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
    $('#save').click(function() {
        var prgmId = $('input[name=options]:checked', '.btn-programs-group').val();
        console.log(prgmId);
        userPrograms[prgmId] = editor.session.getValue();
    });
    $('#compile').click(function() {
        var prgmId = $('input[name=options]:checked', '.btn-programs-group').val();
        console.log(prgmId);
        console.log("compiling");
    });
    $('#reset').click(function() {
        var prgmId = $('input[name=options]:checked', '.btn-programs-group').val();
        userPrograms[prgmId] = programs[prgmId];
        editor.session.setValue(userPrograms[prgmId]);
        console.log(prgmId);
    });
});


//var programs = {"simple":"\nvar t:number = 0;\nvar a:number = 0;\nvar done:char= \"done\";\nvar final:number = 0;\n\nfunction addStuff():void {\n    final = t + a - 1 * 9.53;\n    println(t);\n    println(done);\n}\n\naddStuff();\n    ","fib":"\nvar first_fibo: number = 0;\nprintln(\"The first fibonacci number is: \");\nprintln(first_fibo);\n\nvar second_fibo: number = 1;\nprintln(\"The second fibonacci number is: \");\nprintln(second_fibo);\n\n\nvar limit: number = 100;\n\nvar curr_fib_count: number = 2;\n\nvar curr_fib_num: number = 0;\n//second_fibo = first_fibo + second_fibo;\n\nvar z: number = limit + limit;\nwhile(curr_fib_count < limit) {\nvar this_fibo:number = first_fibo + second_fibo;\nfirst_fibo = second_fibo;\nsecond_fibo = this_fibo;\nprintln(\"The next fibonacci number is: \");\nprintln(this_fibo);\ncurr_fib_count = curr_fib_count+1;\n}\n    ","euler":"\n function tester(str:char, str2:char, x:number):number {\nprintln(\"hello world\");\nvar t:number = 4+5+3;\nreturn t;\n}\n\n\n\n//This program finds the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.\n//the full description of the problem can be found at https://projecteuler.net/problem=6\nfunction sum_square_diff(): number {\nvar i:number = 1;\nvar sum:number = 0;\nvar square_sum:number = 0;\nwhile(i <= 100) {\nsum = sum + i;\nvar temp:number = i * i;\nsquare_sum = square_sum + temp;\ni = i + 1;\n}\nvar square_of_sum:number = sum * sum;\nprintln(\"The sum of the squares is: \");\nprintln(square_sum);\nprintln(\"The square of the sum is: \");\nprintln(square_of_sum);\nprintln(\"The difference between the sum of the squares of the first one hundred natural numbers and the square of the sum is: \");\nvar result:number = square_of_sum - square_sum;\n//println(result);\nvar expected_result:number = 25164150;\nprintln(\"Expected result: \");\nprintln(expected_result);\nprintln(\"Result: \");\nprintln(result);\n\nif(result == expected_result) {\nprintln(\"test passed 1/1\");\n} else {\nprintln(\"test passed 0/1\");\n}\nreturn 0;\n}\n\n//println(sum(1, 100));\nsum_square_diff();\n    ","ifs":"\n var passed:number = 0;\n\n var elseWrong :number = 0;\n var elseCorrect :number = 0;\n\n if(1 < 1+3) {\n     println(\"CORRECT: 1 < 4\");\n } else {\n     println(\"Should not print 1 < 4\");\n     elseWrong = elseWrong + 1;\n }\n\n if(10 < 1+3) {\n     println(\"WRONG: 10 < 4\");\n     wrong = wrong + 1;\n } else {\n     println(\"Should Print else 10 < 4\");\n }\n\n\n //greater than tests\n if(10 > 1+3) {\n     println(\"CORRECT: 10 > 4\");\n } else {\n     println(\"Should not Print else 10 > 4\");\n     elseWrong = elseWrong + 1;\n }\n\n if(3 > 4) {\n     println(\"WRONG: 3 > 4\");\n     wrong = wrong + 1;\n } else {\n     println(\"Should Print 3 > 4\");\n }\n\n //greater than equal\n if(10 >= 1+3) {\n     println(\"CORRECT: 10 >= 4\");\n }\n\n if(4 >= 4) {\n     println(\"CORRECT: 4 >= 4\");\n }\n\n if(3 >= 4) {\n     println(\"WRONG: 3 >= 4\");\n     wrong = wrong + 1;\n }\n\n //less than equal\n if(1 <= 1+3) {\n     println(\"CORRECT: 1 <= 4\");\n }\n\n if(4 <= 3) {\n     println(\"WRONG: 4 <= 3\");\n     wrong = wrong + 1;\n }\n\n if(0.11 <= 0.11) {\n     println(\"CORRECT: 0.11 <= 0.11\");\n }else {\n     println(\"Should NOT Print else 0.11 <= 0.11\");\n     elseWrong = elseWrong + 1;\n }\n\n\n //equality\n\n if(2.44 == 2.44) {\n     println(\"CORRECT: 2.44 == 2.44\");\n } else {\n     println(\"Should Not Print else\");\n     elseWrong = elseWrong + 1;\n }\n\n if(2.00 == 3.0) {\n     println(\"WRONG: 2.0 == 4.0\");\n     wrong = wrong + 1;\n }\n\n\n //not equals\n if(2.44 != 2.44) {\n     println(\"WRONG: 2.44 != 2.44\");\n     wrong = wrong + 1;\n } else {\n     println(\"Should  Print else  2.44 != 2.44\");\n }\n\n if(2.00 != 3.0) {\n     println(\"CORRECT: 2.0 != 3.0\");\n }\n\n println(\"\");\n\n println(\"Total IF tests:\");\n println(14);\n println(\"IF test passed:\");\n var result:number = 14 - wrong;\n println(result);\n\n println(\"Total ELSE tests:\");\n println(7);\n println(\"ELSE test passed:\");\n var result2:number = 7 - wrong;\n println(result2);\n\n println(\"-----------------\");\n\n println(\"Total test\");\n println(21);\n println(\"total test passed\");\n println(result + result2);\n\n    ","recursion":"\n var t:number = 0;\n\nfunction doStuff():void {\nprintln(\"in the function\");\nif(t >= 20) {\nprintln(\"function finished\");\n} else {\nprintln(\"recursively t =\");\nt = t + 1;\nprintln(t);\ndoStuff();\n}\n}\n\ndoStuff();\n\nprintln(\"function recursion expect t==20\");\nprintln(t);\n\nif(t == 20) {\nprintln(\"t = 20 test passed\");\n} else {\nprintln(\"t =\");\nprintln(t);\nprintln(\"test failed\");\n}\n    "};

var programs = {"simple":"/* Type Script is an atempt to implement Javascript \nwith type support. The language is crude in parsing and \nthe parser can sometimes throw errors that don't make sense*/\n\nvar t:number = 0;\nvar a:number = 0;\nvar done:char= \"done\";\nvar final:number = 0;\n\nfunction addStuff():void {\n    final = t + a - 1 * 9.53;\n    println(t);\n    println(done);\n}\n\naddStuff();\n    ","fib":"var first_fibo: number = 0;\nprintln(\"The first fibonacci number is: \");\nprintln(first_fibo);\n//calculates fibonacci numbers\n\nvar second_fibo: number = 1;\nprintln(\"The second fibonacci number is: \");\nprintln(second_fibo);\n\n\nvar limit: number = 100;\nvar curr_fib_count: number = 2;\nvar curr_fib_num: number = 0;\n//second_fibo = first_fibo + second_fibo;\n\nvar z: number = limit + limit;\n\n//while loops work as well to a certain degree \nwhile(curr_fib_count < limit) {\n    var this_fibo:number = first_fibo + second_fibo;\n    first_fibo = second_fibo;\n    second_fibo = this_fibo;\n    println(\"The next fibonacci number is: \");\n    println(this_fibo);\n    curr_fib_count = curr_fib_count+1;\n}\n    ","euler":"function tester(str:char, str2:char, x:number):number {\n    println(\"hello world\"); //prints can only print one argument at a time\n    var t:number = 4+5+3;\n    return t; //return dosent really work, but comments do =) \n}\n\n//This program finds the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.\n//the full description of the problem can be found at https://projecteuler.net/problem=6\nfunction sum_square_diff(): number {\n    var i:number = 1;\n    var sum:number = 0;\n    var square_sum:number = 0;\n    while(i <= 100) {\n        sum = sum + i;\n        var temp:number = i * i;\n        square_sum = square_sum + temp;\n        i = i + 1;\n    }\n    \n    var square_of_sum:number = sum * sum;\n    println(\"The sum of the squares is: \");\n    println(square_sum);\n    println(\"The square of the sum is: \");\n    println(square_of_sum);\n    println(\"The difference between the sum of the squares of the first one hundred natural numbers and the square of the sum is: \");\n    var result:number = square_of_sum - square_sum;\n    //println(result);\n    var expected_result:number = 25164150;\n    println(\"Expected result: \");\n    println(expected_result);\n    println(\"Result: \");\n    println(result);\n    \n    if(result == expected_result) {\n        println(\"test passed 1/1\");\n    } else {\n        println(\"test passed 0/1\");\n    }\n    return 0;\n}\n\nsum_square_diff();\n    ","ifs":"/*\n    This program was to test all the jasmin equality operators \n    <,>,==,!=...\n*/\n var passed:number = 0;\n var elseWrong :number = 0;\n var elseCorrect :number = 0;\n\n if(1 < 1+3) {\n     println(\"CORRECT: 1 < 4\");\n } else {\n     println(\"Should not print 1 < 4\");\n     elseWrong = elseWrong + 1;\n }\n\n if(10 < 1+3) {\n     println(\"WRONG: 10 < 4\");\n     wrong = wrong + 1;\n } else {\n     println(\"Should Print else 10 < 4\");\n }\n\n\n //greater than tests\n if(10 > 1+3) {\n     println(\"CORRECT: 10 > 4\");\n } else {\n     println(\"Should not Print else 10 > 4\");\n     elseWrong = elseWrong + 1;\n }\n\n if(3 > 4) {\n     println(\"WRONG: 3 > 4\");\n     wrong = wrong + 1;\n } else {\n     println(\"Should Print 3 > 4\");\n }\n\n //greater than equal\n if(10 >= 1+3) {\n     println(\"CORRECT: 10 >= 4\");\n }\n\n if(4 >= 4) {\n     println(\"CORRECT: 4 >= 4\");\n }\n\n if(3 >= 4) {\n     println(\"WRONG: 3 >= 4\");\n     wrong = wrong + 1;\n }\n\n //less than equal\n if(1 <= 1+3) {\n     println(\"CORRECT: 1 <= 4\");\n }\n\n if(4 <= 3) {\n     println(\"WRONG: 4 <= 3\");\n     wrong = wrong + 1;\n }\n\n if(0.11 <= 0.11) {\n     println(\"CORRECT: 0.11 <= 0.11\");\n }else {\n     println(\"Should NOT Print else 0.11 <= 0.11\");\n     elseWrong = elseWrong + 1;\n }\n\n\n //equality\n\n if(2.44 == 2.44) {\n     println(\"CORRECT: 2.44 == 2.44\");\n } else {\n     println(\"Should Not Print else\");\n     elseWrong = elseWrong + 1;\n }\n\n if(2.00 == 3.0) {\n     println(\"WRONG: 2.0 == 4.0\");\n     wrong = wrong + 1;\n }\n\n\n //not equals\n if(2.44 != 2.44) {\n     println(\"WRONG: 2.44 != 2.44\");\n     wrong = wrong + 1;\n } else {\n     println(\"Should  Print else  2.44 != 2.44\");\n }\n\n if(2.00 != 3.0) {\n     println(\"CORRECT: 2.0 != 3.0\");\n }\n\n println(\"\");\n\n println(\"Total IF tests:\");\n println(14);\n println(\"IF test passed:\");\n var result:number = 14 - wrong;\n println(result);\n\n println(\"Total ELSE tests:\");\n println(7);\n println(\"ELSE test passed:\");\n var result2:number = 7 - wrong;\n println(result2);\n\n println(\"-----------------\");\n\n println(\"Total test\");\n println(21);\n println(\"total test passed\");\n println(result + result2);\n\n    ","recursion":"/*\n    Recursevly counts to 20\n    again returns don't work so had to \n    use a global varable\n*/ \nvar t:number = 0;\n\nfunction doStuff():void {\n    println(\"in the function\");\n    if(t >= 20) {\n        println(\"function finished\");\n    } else {\n        println(\"recursively t =\");\n    t = t + 1;\n    println(t);\n    doStuff();\n    }\n}\n\ndoStuff();\nprintln(\"function recursion expect t==20\");\nprintln(t);\n\nif(t == 20) {\n    println(\"t = 20 test passed\");\n} else {\n    println(\"t =\");\n    println(t);\n    println(\"test failed\");\n}\n    "};
