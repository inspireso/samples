/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

/**
 * @author lanxe
 */
public class TestNewSize {

    /**
     * -XX:+UseSerialGC -Xmx20m -Xms20m -Xmn1m -XX:SurvivorRatio=2 -XX:+PrintGCDetails
     * -XX:+UseSerialGC -Xmx20m -Xms20m -Xmn7m -XX:SurvivorRatio=2 -XX:+PrintGCDetails
     * -XX:+UseSerialGC -Xmx20m -Xms20m -Xmn15m -XX:SurvivorRatio=8 -XX:+PrintGCDetails
     */
    public static void main(String[] args) {
        byte[] b = null;
        for (int i = 0; i < 10; i++) {
            b = new byte[1 * 1024 * 1024];
        }
    }
}
