/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm.oom;

import java.util.ArrayList;

/**
 * 模拟堆内存溢出
 *
 * -Xmx256m -XX:+PrintGCDetails
 * @author lanxe
 */
public class SimpleHeapOom {
    public static void main(String[] args) {
        ArrayList<byte[]> list = new ArrayList<byte[]>();
        for (int i = 0; i < 1024; i++) {
            list.add(new byte[1024 * 1024]);
        }
    }
}
