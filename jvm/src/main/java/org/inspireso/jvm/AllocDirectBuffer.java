/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

import java.nio.ByteBuffer;

/**
 * @author lanxe
 */
public class AllocDirectBuffer {
    public void directAllocate() {
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < 100000; i++) {
            ByteBuffer b = ByteBuffer.allocateDirect(500);
        }
        long endTime = System.currentTimeMillis();
        System.out.println("testDirectAllocate:" + (endTime - startTime));
    }

    public void bufferAllocate() {
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < 100000; i++) {
            ByteBuffer b = ByteBuffer.allocate(500);
        }
        long endTime = System.currentTimeMillis();
        System.out.println("testBufferAllocate:" + (endTime - startTime));
    }

    public static void main(String[] args){
        AllocDirectBuffer alloc = new AllocDirectBuffer();
        alloc.bufferAllocate();
        alloc.directAllocate();

        alloc.bufferAllocate();
        alloc.directAllocate();
    }
}
