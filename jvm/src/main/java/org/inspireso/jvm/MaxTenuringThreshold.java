/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

import java.util.HashMap;
import java.util.Map;

/**
 * @author lanxe
 */
public class MaxTenuringThreshold {
    public static final int _1M = 1024 * 1024;
    public static final int _1K = 1024;

    /**
     * -Xmx1024M -Xms1024M -XX:+PrintGCDetails -XX:+PrintHeapAtGC -XX:MaxTenuringThreshold=15
     */
    public static void main(String[] args) {
        Map<Integer, byte[]> map = new HashMap<Integer, byte[]>();
        for (int i = 0; i < 5 * _1K; i++) {
            byte[] b = new byte[_1K];
            //防止被回收
            map.put(i, b);
        }

        for (int i = 0; i < 17; i++) {
            for (int k = 0; k < 270; k++) {
                byte[] g = new byte[_1M];
            }
        }
    }
}
