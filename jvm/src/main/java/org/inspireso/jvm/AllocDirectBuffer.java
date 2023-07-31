/*
 * Copyright (c) 2023, inspireso.org
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
