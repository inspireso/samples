/*
 * Copyright (c) 2017 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
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
 * PermGenRemovalValidator
 *
 * @author Pierre-Hugues Charbonneau
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

            String fictiousClassloaderJAR = "file:" + i + ".jar";

            URL[] fictiousClassloaderURL = new URL[]{new URL(fictiousClassloaderJAR)};

            // Create a new classloader instance
            ClassLoader newClassLoader = new URLClassLoader(fictiousClassloaderURL);

            // Create a new Proxy instance
            ClassA t = (ClassA) Proxy.newProxyInstance(newClassLoader,
                    new Class<?>[]{ClassA.class},
                    new ClassAInvocationHandler(new ClassAImpl()));

            // Add the new Proxy instance to the leaking HashMap
            classLeakingMap.put(fictiousClassloaderJAR, t);
        }
    }
}