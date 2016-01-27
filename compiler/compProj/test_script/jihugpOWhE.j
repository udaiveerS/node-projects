.class public jihugpOWhE
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
      putstatic jihugpOWhE/first_fibo F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The first fibonacci number is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     jihugpOWhE/first_fibo F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      ldc 1.0
      putstatic jihugpOWhE/second_fibo F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The second fibonacci number is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     jihugpOWhE/second_fibo F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      ldc 100.0
      putstatic jihugpOWhE/limit F                                     ;pop value: assingment_node
      ldc 2.0
      putstatic jihugpOWhE/curr_fib_count F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic jihugpOWhE/curr_fib_num F                                     ;pop value: assingment_node
      getstatic jihugpOWhE/limit F                                     ;identifier
      getstatic jihugpOWhE/limit F                                     ;identifier
      fadd
      putstatic jihugpOWhE/z F                                     ;pop value: assingment_node
loop1: 
      getstatic jihugpOWhE/curr_fib_count F                                     ;identifier
       fstore_0
      getstatic jihugpOWhE/limit F                                     ;identifier
       fstore_1
       fload_0
       fload_1
fcmpl 
iflt Label1
goto Empty1
Label1:
      getstatic jihugpOWhE/first_fibo F                                     ;identifier
      getstatic jihugpOWhE/second_fibo F                                     ;identifier
      fadd
      putstatic jihugpOWhE/this_fibo F                                     ;pop value: assingment_node
      getstatic jihugpOWhE/second_fibo F                                     ;identifier
      putstatic jihugpOWhE/first_fibo F                                     ;pop value: assingment_node
      getstatic jihugpOWhE/this_fibo F                                     ;identifier
      putstatic jihugpOWhE/second_fibo F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "The next fibonacci number is: "
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     jihugpOWhE/this_fibo F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic jihugpOWhE/curr_fib_count F                                     ;identifier
      ldc 1.0
      fadd
      putstatic jihugpOWhE/curr_fib_count F                                     ;pop value: assingment_node
goto loop1
Empty1:

    return

.limit locals 100
.limit stack 16
.end method
