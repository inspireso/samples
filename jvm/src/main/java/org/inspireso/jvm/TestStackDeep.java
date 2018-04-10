/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

/**
 * @author lanxe
 */
public class TestStackDeep {
    private static int count = 0;

    public static void recursion() {
        count++;
        recursion();
    }

    /**
     * -Xss128K
     */
    public static void main(String[] args) {
        try {
            recursion();
        } catch (Throwable e) {
            System.out.println("deep of calling = " + count);
            e.printStackTrace();
        }
    }
}
