.class public StCpkDidEe
.super java/lang/Object

.field private static sum F
.field private static t F


.method public static doStuff2()V
      getstatic StCpkDidEe/sum F                                     ;identifier
      getstatic StCpkDidEe/t F                                     ;identifier
      fadd
      ldc 4.032
      fsub
      putstatic StCpkDidEe/sum F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "in the function"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     StCpkDidEe/sum F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
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

      ldc 0.0
      putstatic StCpkDidEe/t F                                     ;pop value: assingment_node
      ldc 9.0
      putstatic StCpkDidEe/sum F                                     ;pop value: assingment_node
      invokestatic StCpkDidEe/doStuff2()V

    return

.limit locals 100
.limit stack 16
.end method
