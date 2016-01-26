.class public hqIOVtcmvy
.super java/lang/Object

.field private static elseCorrect F
.field private static elseWrong F
.field private static passed F
.field private static result F
.field private static result2 F
.field private static wrong F

.method public <init>()V

	aload_0
	invokenonvirtual	java/lang/Object/<init>()V
	return

.limit locals 1
.limit stack 1
.end method

.method public static main([Ljava/lang/String;)V

      ldc 0.0
      putstatic hqIOVtcmvy/wrong F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic hqIOVtcmvy/passed F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic hqIOVtcmvy/elseWrong F                                     ;pop value: assingment_node
      ldc 0.0
      putstatic hqIOVtcmvy/elseCorrect F                                     ;pop value: assingment_node
      ldc 1.0
       fstore_0
      ldc 1.0
      ldc 3.0
      fadd
       fstore_1
       fload_0
       fload_1
fcmpl 
iflt Label1
       goto Label2
Label1:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "CORRECT: 1 < 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       goto Label3
Label2:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Should not print 1 < 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic hqIOVtcmvy/elseWrong F                                     ;identifier
      ldc 1.0
      fadd
      putstatic hqIOVtcmvy/elseWrong F                                     ;pop value: assingment_node
Label3:
      ldc 10.0
       fstore_0
      ldc 1.0
      ldc 3.0
      fadd
       fstore_1
       fload_0
       fload_1
fcmpl 
iflt Label4
       goto Label5
Label4:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "WRONG: 10 < 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic hqIOVtcmvy/wrong F                                     ;identifier
      ldc 1.0
      fadd
      putstatic hqIOVtcmvy/wrong F                                     ;pop value: assingment_node
       goto Label6
Label5:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Should Print else 10 < 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
Label6:
      ldc 10.0
       fstore_0
      ldc 1.0
      ldc 3.0
      fadd
       fstore_1
       fload_0
       fload_1
fcmpg 
ifgt Label7
       goto Label8
Label7:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "CORRECT: 10 > 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       goto Label9
Label8:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Should not Print else 10 > 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic hqIOVtcmvy/elseWrong F                                     ;identifier
      ldc 1.0
      fadd
      putstatic hqIOVtcmvy/elseWrong F                                     ;pop value: assingment_node
Label9:
      ldc 3.0
       fstore_0
      ldc 4.0
       fstore_1
       fload_0
       fload_1
fcmpg 
ifgt Label10
       goto Label11
Label10:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "WRONG: 3 > 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic hqIOVtcmvy/wrong F                                     ;identifier
      ldc 1.0
      fadd
      putstatic hqIOVtcmvy/wrong F                                     ;pop value: assingment_node
       goto Label12
Label11:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Should Print 3 > 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
Label12:
      ldc 10.0
       fstore_0
      ldc 1.0
      ldc 3.0
      fadd
       fstore_1
       fload_0
       fload_1
fcmpg 
ifge Label13
       goto Label14
Label13:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "CORRECT: 10 >= 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       goto Label15
Label14:
Label15:
      ldc 4.0
       fstore_0
      ldc 4.0
       fstore_1
       fload_0
       fload_1
fcmpg 
ifge Label16
       goto Label17
Label16:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "CORRECT: 4 >= 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       goto Label18
Label17:
Label18:
      ldc 3.0
       fstore_0
      ldc 4.0
       fstore_1
       fload_0
       fload_1
fcmpg 
ifge Label19
       goto Label20
Label19:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "WRONG: 3 >= 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic hqIOVtcmvy/wrong F                                     ;identifier
      ldc 1.0
      fadd
      putstatic hqIOVtcmvy/wrong F                                     ;pop value: assingment_node
       goto Label21
Label20:
Label21:
      ldc 1.0
       fstore_0
      ldc 1.0
      ldc 3.0
      fadd
       fstore_1
       fload_0
       fload_1
fcmpl 
ifle Label22
       goto Label23
Label22:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "CORRECT: 1 <= 4"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       goto Label24
Label23:
Label24:
      ldc 4.0
       fstore_0
      ldc 3.0
       fstore_1
       fload_0
       fload_1
fcmpl 
ifle Label25
       goto Label26
Label25:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "WRONG: 4 <= 3"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic hqIOVtcmvy/wrong F                                     ;identifier
      ldc 1.0
      fadd
      putstatic hqIOVtcmvy/wrong F                                     ;pop value: assingment_node
       goto Label27
Label26:
Label27:
      ldc 0.11
       fstore_0
      ldc 0.11
       fstore_1
       fload_0
       fload_1
fcmpl 
ifle Label28
       goto Label29
Label28:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "CORRECT: 0.11 <= 0.11"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       goto Label30
Label29:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Should NOT Print else 0.11 <= 0.11"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic hqIOVtcmvy/elseWrong F                                     ;identifier
      ldc 1.0
      fadd
      putstatic hqIOVtcmvy/elseWrong F                                     ;pop value: assingment_node
Label30:
      ldc 2.44
       fstore_0
      ldc 2.44
       fstore_1
       fload_0
       fload_1
fcmpg 
ifeq Label31
       goto Label32
Label31:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "CORRECT: 2.44 == 2.44"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       goto Label33
Label32:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Should Not Print else"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic hqIOVtcmvy/elseWrong F                                     ;identifier
      ldc 1.0
      fadd
      putstatic hqIOVtcmvy/elseWrong F                                     ;pop value: assingment_node
Label33:
      ldc 2.0
       fstore_0
      ldc 3.0
       fstore_1
       fload_0
       fload_1
fcmpg 
ifeq Label34
       goto Label35
Label34:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "WRONG: 2.0 == 4.0"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic hqIOVtcmvy/wrong F                                     ;identifier
      ldc 1.0
      fadd
      putstatic hqIOVtcmvy/wrong F                                     ;pop value: assingment_node
       goto Label36
Label35:
Label36:
      ldc 2.44
       fstore_0
      ldc 2.44
       fstore_1
       fload_0
       fload_1
fcmpg 
ifne Label37
       goto Label38
Label37:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "WRONG: 2.44 != 2.44"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      getstatic hqIOVtcmvy/wrong F                                     ;identifier
      ldc 1.0
      fadd
      putstatic hqIOVtcmvy/wrong F                                     ;pop value: assingment_node
       goto Label39
Label38:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Should  Print else  2.44 != 2.44"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
Label39:
      ldc 2.0
       fstore_0
      ldc 3.0
       fstore_1
       fload_0
       fload_1
fcmpg 
ifne Label40
       goto Label41
Label40:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "CORRECT: 2.0 != 3.0"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       goto Label42
Label41:
Label42:
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc ""
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Total IF tests:"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc 14.0
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "IF test passed:"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      ldc 14.0
      getstatic hqIOVtcmvy/wrong F                                     ;identifier
      fsub
      putstatic hqIOVtcmvy/result F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     hqIOVtcmvy/result F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Total ELSE tests:"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc 7.0
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "ELSE test passed:"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
      ldc 7.0
      getstatic hqIOVtcmvy/wrong F                                     ;identifier
      fsub
      putstatic hqIOVtcmvy/result2 F                                     ;pop value: assingment_node
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       getstatic     hqIOVtcmvy/result2 F
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "-----------------"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "Total test"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc 21.0
      invokestatic  java/lang/String.valueOf(F)Ljava/lang/String;
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V
       getstatic    java/lang/System/out Ljava/io/PrintStream;
       ldc "total test passed"
       invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V

    return

.limit locals 100
.limit stack 16
.end method
