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
public class AccessDirectBuffer {
    public void directAccess() {
        long startTime = System.currentTimeMillis();
        ByteBuffer b = ByteBuffer.allocateDirect(500);
        for (int i = 0; i < 100000; i++) {
            for (int j = 0; j < 99; j++) {
                b.putInt(j);
            }
            b.flip();
            for (int j = 0; j < 99; j++) {
                b.getInt();
            }
            b.clear();
        }
        long endTime = System.currentTimeMillis();
        System.out.println("testDirectWrite:" + (endTime - startTime));
    }

    public void bufferAccess() {
        long startTime = System.currentTimeMillis();
        ByteBuffer b = ByteBuffer.allocate(500);
        for (int i = 0; i < 100000; i++) {
            for (int j = 0; j < 99; j++) {
                b.putInt(j);
            }
            b.flip();
            for (int j = 0; j < 99; j++) {
                b.getInt();
            }
            b.clear();
        }
        long endTime = System.currentTimeMillis();
        System.out.println("testBufferWrite:" + (endTime - startTime));
    }

    public static void main(String[] args){
        AccessDirectBuffer alloc = new AccessDirectBuffer();
        alloc.bufferAccess();
        alloc.directAccess();

        alloc.bufferAccess();
        alloc.directAccess();
    }
}
