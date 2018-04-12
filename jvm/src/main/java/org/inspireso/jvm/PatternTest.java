/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

import java.util.regex.Pattern;

/**
 * @author lanxe
 */
public class PatternTest {

    public static final void regex(int times) {
        String MATCHES_REGEX = "[a-zA-Z0-9\u4E00-\u9FFF\\s,.;_/]+";

        for (int i = 0; i < times; i++) {
            String.valueOf(i).matches(MATCHES_REGEX);
        }

    }

    public static final void regex2(int times) {
        Pattern regex = Pattern.compile("[a-zA-Z0-9\u4E00-\u9FFF\\s,.;_/]+");

        for (int i = 0; i < times; i++) {
            regex.matcher(String.valueOf(i)).matches();
        }
    }

    /**
     * JAVA_OPTS: -Xmx15m -XX:+PrintGCDetails
     */
    public static void main(String[] args) {
        int times = 10000;
        long started = System.currentTimeMillis();
        regex(times);
        System.out.println("input.matches(regex):" + (System.currentTimeMillis() - started) + "ms");

        started = System.currentTimeMillis();
        regex2(times);
        System.out.println("Pattern.matches(input).matches():" + (System.currentTimeMillis() - started) + "ms");

        started = System.currentTimeMillis();
        regex(times);
        System.out.println("input.matches(regex):" + (System.currentTimeMillis() - started) + "ms");

        started = System.currentTimeMillis();
        regex2(times);
        System.out.println("Pattern.matches(input).matches():" + (System.currentTimeMillis() - started) + "ms")
        ;

    }
}
