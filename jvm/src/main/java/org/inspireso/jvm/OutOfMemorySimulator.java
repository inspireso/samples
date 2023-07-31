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

import java.lang.reflect.Proxy;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author lanxe
 */
public class OutOfMemorySimulator {

    private static Map<String, ClassA> classLeakingMap = new HashMap<String, ClassA>();

    private final static int NB_ITERATIONS_DEFAULT = 50000;

    /**
     * @param args
     */
    public static void main(String[] args) {
        try {
//            stackOverflow(args);
            stringLeaking(args);
            classLeaking(args);
        } catch (Throwable e) {
            System.out.println("ERROR: " + e);
        }

        System.out.println("Done!");
    }

    private int stackLength = 0;

    public void stackOverflow() {
        ++stackLength;
        stackOverflow();
    }

    private static void stackOverflow(String[] args) throws Throwable {
        OutOfMemorySimulator test = new OutOfMemorySimulator();
        test.stackOverflow();
    }

    private static void stringLeaking(String[] args) {
        System.out.println("String metadata leak simulator");

        List<String> list = new ArrayList<String>();
        int i = 0;
        while (true) {
            list.add(String.valueOf(i++).intern());
        }

    }

    private static void classLeaking(String[] args) throws MalformedURLException {
        System.out.println("Class metadata leak simulator");

        int nbIterations = (args != null && args.length == 1) ? Integer.parseInt(args[0]) : NB_ITERATIONS_DEFAULT;


        for (int i = 0; i < nbIterations; i++) {

            String classloaderJAR = "file:" + i + ".jar";

            URL[] classloaderURL = new URL[]{new URL(classloaderJAR)};

            // Create a new classloader instance
            ClassLoader newClassLoader = new URLClassLoader(classloaderURL);

            // Create a new Proxy instance
            ClassA t = (ClassA) Proxy.newProxyInstance(newClassLoader,
                    new Class<?>[]{ClassA.class},
                    new ClassAInvocationHandler(new ClassAImpl()));

            // Add the new Proxy instance to the leaking HashMap
            classLeakingMap.put(classloaderJAR, t);
        }
    }
}