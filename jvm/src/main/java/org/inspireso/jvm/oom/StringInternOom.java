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
