/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

import java.util.Vector;

/**
 * @author lanxe
 */
public class OomTest {

    /**
     * -Xmx20m -Xms5m -XX:+PrintGCDetails
     */
    public static void main(String[] args) {
        Vector v = new Vector();
        for (int i = 0; i < 25; i++) {
            v.add(new byte[1 * 1024 * 1024]);
        }
    }
}
