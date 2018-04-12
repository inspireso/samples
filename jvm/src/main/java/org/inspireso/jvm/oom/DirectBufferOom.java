/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm.oom;

import java.nio.ByteBuffer;

/**
 * 模拟直接内存溢出(在32位机器上运行)
 * 使用堆外内存
 * -XX:MaxDirectMemorySize=10m -XX:+PrintGCDetails
 *
 * @author lanxe
 */
public class DirectBufferOom {
    public static void main(String[] args) {
        for (int i = 0; i < 1024; i++) {
            ByteBuffer.allocateDirect(1024 * 1024);
            System.out.println(i);

        }
    }
}
