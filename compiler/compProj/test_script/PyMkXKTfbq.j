.class public PyMkXKTfbq
.super java/lang/Object

.field private static curr_fib_count F
.field private static curr_fib_num F
.field private static first_fibo F
.field private static limit F
.field private static second_fibo F
.field private static this_fibo F
.field private static z F

.method public <init>()V

	aload_0
	invokenonvirtual	java/lang/Object/<init>()V
	return

.limit locals 1
.limit stack 1
.end method

.method public static main([Ljava/lang/String;)V

      ldc 0.0
      putstatic PyMkXKTfbq/first_fibo F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The first fibonacci number is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     PyMkXKTfbq/first_fibo F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      ldc 1.0
      putstatic PyMkXKTfbq/second_fibo F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The second fibonacci number is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     PyMkXKTfbq/second_fibo F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      ldc 100.0
      putstatic PyMkXKTfbq/limit F                                     ;pop value: assingment_node
      ldc 2.0
      putstatic PyMkXKTfbq/curr_fib_count F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic PyMkXKTfbq/curr_fib_num F                                     ;pop value: assingment_node
      getstatic PyMkXKTfbq/limit F                                     ;identifier
      getstatic PyMkXKTfbq/limit F                                     ;identifier
      fadd
      putstatic PyMkXKTfbq/z F                                     ;pop value: assingment_node
loop1: 
      getstatic PyMkXKTfbq/curr_fib_count F                                     ;identifier
       fstore_0
      getstatic PyMkXKTfbq/limit F                                     ;identifier
       fstore_1
       fload_0
       fload_1
fcmpl 
iflt Label1
goto Empty1
Label1:
      getstatic PyMkXKTfbq/first_fibo F                                     ;identifier
      getstatic PyMkXKTfbq/second_fibo F                                     ;identifier
      fadd
      putstatic PyMkXKTfbq/this_fibo F                                     ;pop value: assingment_node
      getstatic PyMkXKTfbq/second_fibo F                                     ;identifier
      putstatic PyMkXKTfbq/first_fibo F                                     ;pop value: assingment_node
      getstatic PyMkXKTfbq/this_fibo F                                     ;identifier
      putstatic PyMkXKTfbq/second_fibo F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The next fibonacci number is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     PyMkXKTfbq/this_fibo F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic PyMkXKTfbq/curr_fib_count F                                     ;identifier
      ldc 1.0
      fadd
      putstatic PyMkXKTfbq/curr_fib_count F                                     ;pop value: assingment_node
goto loop1
Empty1:

    return

.limit locals 100
.limit stack 16
.end method
