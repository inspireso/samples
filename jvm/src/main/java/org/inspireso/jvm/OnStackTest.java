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
public class OnStackTest {

    public static class User {
        public int id = 0;
        public String name = "";
    }

    public static void alloc() {
        User u = new User();
        u.id = 5;
        u.name = "enoch";
    }

    /**
     * 在server模式下，才可以启动逃逸分析
     * -server -Xmx5m -Xms5m -XX:+PrintGC  -XX:-UseTLAB -XX:+EliminateAllocations -XX:+DoEscapeAnalysis
     *
     * -server -Xmx5m -Xms5m -XX:+PrintGC  -XX:-UseTLAB -XX:+EliminateAllocations -XX:-DoEscapeAnalysis
     *
     * @param args
     */
    public static void main(String[] args) {
        long b = System.currentTimeMillis();
        for (int i = 0; i < 1000000000; i++) {
            alloc();
        }
        long e = System.currentTimeMillis();
        System.out.println(e - b);
    }
}
