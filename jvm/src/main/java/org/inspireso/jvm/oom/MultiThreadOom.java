/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm.oom;

/**
 * 模拟过多线程导致OOM
 * 线程使用堆外内存
 * -Xss
 * @author lanxe
 */
public class MultiThreadOom {
    static class SleepThread implements Runnable {

        @Override
        public void run() {
            try {
                Thread.sleep(60 * 60 * 1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        for (int i = 0; i < 1500; i++) {
            new Thread(new SleepThread(), "Thread" + i).start();
            System.out.println("Thread" + i + " created");
        }
    }
}
