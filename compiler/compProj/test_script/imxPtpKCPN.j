.class public imxPtpKCPN
.super java/lang/Object

.field private static sum F
.field private static t F


.method public static doStuff2()V
      getstatic imxPtpKCPN/sum F                                     ;identifier
      getstatic imxPtpKCPN/t F                                     ;identifier
      fadd
      ldc 4.032
      fsub
      putstatic imxPtpKCPN/sum F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "in the function"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     imxPtpKCPN/sum F
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
      putstatic imxPtpKCPN/t F                                     ;pop value: assingment_node
      ldc 9.0
      putstatic imxPtpKCPN/sum F                                     ;pop value: assingment_node
      invokestatic imxPtpKCPN/doStuff2()V

    return

.limit locals 100
.limit stack 16
.end method
