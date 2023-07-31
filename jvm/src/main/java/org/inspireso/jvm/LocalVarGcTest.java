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

/**
 * @author lanxe
 */
public class LocalVarGcTest {

    /**
     * 无法回收 byte 数组
     */
    public void localVarGc1() {
        byte[] a = new byte[6 * 1024 * 1024];
        System.gc();
    }

    /**
     * 可以回收 byte 数组
     */
    public void localVarGc2() {
        byte[] a = new byte[6 * 1024 * 1024];
        a = null;
        System.gc();
    }

    /**
     * 无法回收 byte 数组
     */
    public void localVarGc3() {
        {
            byte[] a = new byte[6 * 1024 * 1024];
        }
        System.gc();
    }

    /**
     * 可以回收 byte 数组
     */
    public void localVarGc4() {
        {
            byte[] a = new byte[6 * 1024 * 1024];
        }
        int c = 10;
        System.gc();
    }

    /**
     * 可以回收 byte 数组
     */
    public void localVarGc5() {
        localVarGc1();
        System.gc();
    }

    /**
     * -XX:+PrintGCDetails
     *
     * @param args
     */
    public static void main(String[] args) {
        LocalVarGcTest ins = new LocalVarGcTest();
        System.out.println("##localVarGc1:");
        ins.localVarGc1();
        System.out.println("##localVarGc2:");
        ins.localVarGc2();
        System.out.println("##localVarGc3:");
        ins.localVarGc3();
        System.out.println("##localVarGc4:");
        ins.localVarGc4();
        System.out.println("##localVarGc5:");
        ins.localVarGc5();
    }
}
