/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm.oom;

import java.util.ArrayList;

/**
 * 模拟常量池OOM
 * jdk1.6: PermGen
 * jdk1.7: Heap
 *
 * @author lanxe
 */
public class StringInternOom {
    /**
     * jdk1.6: java.lang.OutOfMemoryError: PermGen space
     * jdk1.7: java.lang.OutOfMemoryError: Java heap space
     * <p>
     * -Xmx2m -XX:MaxPermSize=2m -XX:+PrintGCDetails
     * -Xmx2m -Xmx10m -XX:MaxMetaspaceSize=1m -XX:+PrintGCDetails
     */
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<String>();
        int i = 0;
        while (true) {
            list.add(String.valueOf(i++).intern());
        }
    }
}
