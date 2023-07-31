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

import java.util.regex.Pattern;

/**
 * @author lanxe
 */
public class PatternTest {

    public static final void regex(int times) {
        String MATCHES_REGEX = "[a-zA-Z0-9\u4E00-\u9FFF\\s,.;_/]+";

        for (int i = 0; i < times; i++) {
            String.valueOf(i).matches(MATCHES_REGEX);
        }

    }

    public static final void regex2(int times) {
        Pattern regex = Pattern.compile("[a-zA-Z0-9\u4E00-\u9FFF\\s,.;_/]+");

        for (int i = 0; i < times; i++) {
            regex.matcher(String.valueOf(i)).matches();
        }
    }

    /**
     * JAVA_OPTS: -Xmx15m -XX:+PrintGCDetails
     */
    public static void main(String[] args) {
        int times = 10000;
        long started = System.currentTimeMillis();
        regex(times);
        System.out.println("input.matches(regex):" + (System.currentTimeMillis() - started) + "ms");

        started = System.currentTimeMillis();
        regex2(times);
        System.out.println("Pattern.matches(input).matches():" + (System.currentTimeMillis() - started) + "ms");

        started = System.currentTimeMillis();
        regex(times);
        System.out.println("input.matches(regex):" + (System.currentTimeMillis() - started) + "ms");

        started = System.currentTimeMillis();
        regex2(times);
        System.out.println("Pattern.matches(input).matches():" + (System.currentTimeMillis() - started) + "ms")
        ;

    }
}
