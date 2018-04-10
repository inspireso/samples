/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

/**
 * @author lanxe
 */
public class TestLocalVarGc {

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
        TestLocalVarGc ins = new TestLocalVarGc();
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
