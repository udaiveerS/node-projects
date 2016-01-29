.class public RpIifpHYgW
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
      putstatic RpIifpHYgW/t F                                     ;pop value: assingment_node
      getstatic RpIifpHYgW/t F                                     ;identifier
return
.limit locals 32
.limit stack 40
.end method


.method public static sum_square_diff()V
      ldc 1.0
      putstatic RpIifpHYgW/i F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic RpIifpHYgW/sum F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic RpIifpHYgW/square_sum F                                     ;pop value: assingment_node
loop1: 
      getstatic RpIifpHYgW/i F                                     ;identifier
       fstore_0
      ldc 100.0
       fstore_1
       fload_0
       fload_1
fcmpl 
ifle Label1
goto Empty1
Label1:
      getstatic RpIifpHYgW/sum F                                     ;identifier
      getstatic RpIifpHYgW/i F                                     ;identifier
      fadd
      putstatic RpIifpHYgW/sum F                                     ;pop value: assingment_node
      getstatic RpIifpHYgW/i F                                     ;identifier
      getstatic RpIifpHYgW/i F                                     ;identifier
      fmul
      putstatic RpIifpHYgW/temp F                                     ;pop value: assingment_node
      getstatic RpIifpHYgW/square_sum F                                     ;identifier
      getstatic RpIifpHYgW/temp F                                     ;identifier
      fadd
      putstatic RpIifpHYgW/square_sum F                                     ;pop value: assingment_node
      getstatic RpIifpHYgW/i F                                     ;identifier
      ldc 1.0
      fadd
      putstatic RpIifpHYgW/i F                                     ;pop value: assingment_node
goto loop1
Empty1:
      getstatic RpIifpHYgW/sum F                                     ;identifier
      getstatic RpIifpHYgW/sum F                                     ;identifier
      fmul
      putstatic RpIifpHYgW/square_of_sum F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The sum of the squares is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     RpIifpHYgW/square_sum F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The square of the sum is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     RpIifpHYgW/square_of_sum F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The difference between the sum of the squares of the first one hundred natural numbers and the square of the sum is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic RpIifpHYgW/square_of_sum F                                     ;identifier
      getstatic RpIifpHYgW/square_sum F                                     ;identifier
      fsub
      putstatic RpIifpHYgW/result F                                     ;pop value: assingment_node
      ldc 2.516415E7
      putstatic RpIifpHYgW/expected_result F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Expected result: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     RpIifpHYgW/expected_result F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Result: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     RpIifpHYgW/result F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic RpIifpHYgW/result F                                     ;identifier
       fstore_0
      getstatic RpIifpHYgW/expected_result F                                     ;identifier
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

      invokestatic RpIifpHYgW/sum_square_diff()V

    return

.limit locals 100
.limit stack 16
.end method
