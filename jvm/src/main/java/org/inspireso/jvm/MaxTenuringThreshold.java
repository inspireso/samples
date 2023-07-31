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

import java.util.HashMap;
import java.util.Map;

/**
 * @author lanxe
 */
public class MaxTenuringThreshold {
    public static final int _1M = 1024 * 1024;
    public static final int _1K = 1024;

    /**
     * -Xmx1024M -Xms1024M -XX:+PrintGCDetails -XX:+PrintHeapAtGC -XX:MaxTenuringThreshold=15
     */
    public static void main(String[] args) {
        Map<Integer, byte[]> map = new HashMap<Integer, byte[]>();
        for (int i = 0; i < 5 * _1K; i++) {
            byte[] b = new byte[_1K];
            //防止被回收
            map.put(i, b);
        }

        for (int i = 0; i < 17; i++) {
            for (int k = 0; k < 270; k++) {
                byte[] g = new byte[_1M];
            }
        }
    }
}
