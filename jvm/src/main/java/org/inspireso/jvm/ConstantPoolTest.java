/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

/**
 * @author lanxe
 */
public class ConstantPoolTest {

    public static void main(String[] args) {
        if (args.length == 0) {
            return;
        }

        System.out.println(
                System.identityHashCode((args[0] + Integer.toString(0)))
        );
        System.out.println(
                System.identityHashCode((args[0] + Integer.toString(0)).intern())
        );

        System.out.println(
                System.identityHashCode((args[0] + Integer.toString(0)).intern())
        );

        System.gc();
        System.out.println(
                System.identityHashCode((args[0] + Integer.toString(0)).intern())
        );

    }
}
