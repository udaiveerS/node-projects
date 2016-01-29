.class public OBuqKAJlgS
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
      putstatic OBuqKAJlgS/t F                                     ;pop value: assingment_node
      getstatic OBuqKAJlgS/t F                                     ;identifier
return
.limit locals 32
.limit stack 40
.end method


.method public static sum_square_diff()V
      ldc 1.0
      putstatic OBuqKAJlgS/i F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic OBuqKAJlgS/sum F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic OBuqKAJlgS/square_sum F                                     ;pop value: assingment_node
loop1: 
      getstatic OBuqKAJlgS/i F                                     ;identifier
       fstore_0
      ldc 100.0
       fstore_1
       fload_0
       fload_1
fcmpl 
ifle Label1
goto Empty1
Label1:
      getstatic OBuqKAJlgS/sum F                                     ;identifier
      getstatic OBuqKAJlgS/i F                                     ;identifier
      fadd
      putstatic OBuqKAJlgS/sum F                                     ;pop value: assingment_node
      getstatic OBuqKAJlgS/i F                                     ;identifier
      getstatic OBuqKAJlgS/i F                                     ;identifier
      fmul
      putstatic OBuqKAJlgS/temp F                                     ;pop value: assingment_node
      getstatic OBuqKAJlgS/square_sum F                                     ;identifier
      getstatic OBuqKAJlgS/temp F                                     ;identifier
      fadd
      putstatic OBuqKAJlgS/square_sum F                                     ;pop value: assingment_node
      getstatic OBuqKAJlgS/i F                                     ;identifier
      ldc 1.0
      fadd
      putstatic OBuqKAJlgS/i F                                     ;pop value: assingment_node
goto loop1
Empty1:
      getstatic OBuqKAJlgS/sum F                                     ;identifier
      getstatic OBuqKAJlgS/sum F                                     ;identifier
      fmul
      putstatic OBuqKAJlgS/square_of_sum F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The sum of the squares is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     OBuqKAJlgS/square_sum F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The square of the sum is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     OBuqKAJlgS/square_of_sum F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The difference between the sum of the squares of the first one hundred natural numbers and the square of the sum is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic OBuqKAJlgS/square_of_sum F                                     ;identifier
      getstatic OBuqKAJlgS/square_sum F                                     ;identifier
      fsub
      putstatic OBuqKAJlgS/result F                                     ;pop value: assingment_node
      ldc 2.516415E7
      putstatic OBuqKAJlgS/expected_result F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Expected result: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     OBuqKAJlgS/expected_result F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Result: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     OBuqKAJlgS/result F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic OBuqKAJlgS/result F                                     ;identifier
       fstore_0
      getstatic OBuqKAJlgS/expected_result F                                     ;identifier
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

      invokestatic OBuqKAJlgS/sum_square_diff()V

    return

.limit locals 100
.limit stack 16
.end method
