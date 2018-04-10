/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

/**
 * @author lanxe
 */
public class HeapAlloc {
    /**
     * -Xmx20m -Xms5m -XX:+PrintCommandLineFlags -XX:+PrintGCDetails -XX:+UseSerialGC
     * -Xmx20m -Xms20m -Xmn7m -XX:SurvivorRatio=2 -XX:+PrintGCDetails -XX:+UseSerialGC
     * -XX:+UseSerialGC -Xmx20m -Xms20m -Xmn15m -XX:SurvivorRatio=8 -XX:+PrintGCDetails -XX:+UseSerialGC
     */
    public static void main(String[] args) {
        printRuntime();

        byte[] b = new byte[1 * 1024 * 1024];
        System.out.println("分配了 1M 空间给数组");
        printRuntime();

        b = new byte[4 * 1024 * 1024];
        System.out.println("分配了 4M 空间给数组");
        printRuntime();


    }

    private static void printRuntime() {
        System.out.print("maxMemory=");
        System.out.println(Runtime.getRuntime().maxMemory() + "bytes");
        System.out.print("free mem=");
        System.out.println(Runtime.getRuntime().freeMemory() + "bytes");
        System.out.print("total mem=");
        System.out.println(Runtime.getRuntime().totalMemory() + "bytes");
    }
}
