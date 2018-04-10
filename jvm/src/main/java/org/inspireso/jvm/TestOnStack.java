/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

/**
 * @author lanxe
 */
public class TestOnStack {

    public static class User {
        public int id = 0;
        public String name = "";
    }

    public static void alloc() {
        User u = new User();
        u.id = 5;
        u.name = "enoch";
    }

    /**
     * 在server模式下，才可以启动逃逸分析
     * -server -Xmx5m -Xms5m -XX:+PrintGC  -XX:-UseTLAB -XX:+EliminateAllocations -XX:+DoEscapeAnalysis
     *
     * -server -Xmx5m -Xms5m -XX:+PrintGC  -XX:-UseTLAB -XX:+EliminateAllocations -XX:-DoEscapeAnalysis
     *
     * @param args
     */
    public static void main(String[] args) {
        long b = System.currentTimeMillis();
        for (int i = 0; i < 1000000000; i++) {
            alloc();
        }
        long e = System.currentTimeMillis();
        System.out.println(e - b);
    }
}
