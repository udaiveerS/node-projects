.class public pHQxOrKZYy
.super java/lang/Object

.field private static expected_result F
.field private static i F
.field private static result F
.field private static square_of_sum F
.field private static square_sum F
.field private static sum F
.field private static t F
.field private static temp F


.method public static tester()V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "hello world"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      ldc 4.0
      ldc 5.0
      fadd
      ldc 3.0
      fadd
      putstatic pHQxOrKZYy/t F                                     ;pop value: assingment_node
      getstatic pHQxOrKZYy/t F                                     ;identifier
return
.limit locals 32
.limit stack 40
.end method


.method public static sum_square_diff()V
      ldc 1.0
      putstatic pHQxOrKZYy/i F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic pHQxOrKZYy/sum F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic pHQxOrKZYy/square_sum F                                     ;pop value: assingment_node
loop1: 
      getstatic pHQxOrKZYy/i F                                     ;identifier
       fstore_0
      ldc 100.0
       fstore_1
       fload_0
       fload_1
fcmpl 
ifle Label1
goto Empty1
Label1:
      getstatic pHQxOrKZYy/sum F                                     ;identifier
      getstatic pHQxOrKZYy/i F                                     ;identifier
      fadd
      putstatic pHQxOrKZYy/sum F                                     ;pop value: assingment_node
      getstatic pHQxOrKZYy/i F                                     ;identifier
      getstatic pHQxOrKZYy/i F                                     ;identifier
      fmul
      putstatic pHQxOrKZYy/temp F                                     ;pop value: assingment_node
      getstatic pHQxOrKZYy/square_sum F                                     ;identifier
      getstatic pHQxOrKZYy/temp F                                     ;identifier
      fadd
      putstatic pHQxOrKZYy/square_sum F                                     ;pop value: assingment_node
      getstatic pHQxOrKZYy/i F                                     ;identifier
      ldc 1.0
      fadd
      putstatic pHQxOrKZYy/i F                                     ;pop value: assingment_node
goto loop1
Empty1:
      getstatic pHQxOrKZYy/sum F                                     ;identifier
      getstatic pHQxOrKZYy/sum F                                     ;identifier
      fmul
      putstatic pHQxOrKZYy/square_of_sum F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The sum of the squares is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     pHQxOrKZYy/square_sum F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The square of the sum is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     pHQxOrKZYy/square_of_sum F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The difference between the sum of the squares of the first one hundred natural numbers and the square of the sum is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic pHQxOrKZYy/square_of_sum F                                     ;identifier
      getstatic pHQxOrKZYy/square_sum F                                     ;identifier
      fsub
      putstatic pHQxOrKZYy/result F                                     ;pop value: assingment_node
      ldc 2.516415E7
      putstatic pHQxOrKZYy/expected_result F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Expected result: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     pHQxOrKZYy/expected_result F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Result: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     pHQxOrKZYy/result F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic pHQxOrKZYy/result F                                     ;identifier
       fstore_0
      getstatic pHQxOrKZYy/expected_result F                                     ;identifier
       fstore_1
       fload_0
       fload_1
fcmpg 
ifeq Label2
       goto Label3
Label2:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "test passed 1/1"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       goto Label4
Label3:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "test passed 0/1"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
Label4:
      ldc 0.0
return
.limit locals 32
.limit stack 40
.end method

.method public <init>()V

	aload_0
	invokenonvirtual	java/lang/Object/<init>()V
	return

.limit locals 1
.limit stack 1
.end method

.method public static main([Ljava/lang/String;)V

      invokestatic pHQxOrKZYy/sum_square_diff()V

    return

.limit locals 100
.limit stack 16
.end method
