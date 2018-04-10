/*
 * Copyright (c) 2018 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

package org.inspireso.jvm;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import net.sf.cglib.beans.BeanGenerator;
import net.sf.cglib.beans.BeanMap;

/**
 * @author lanxe
 */
public class TestPerm {

    public static class CglibBean {
        /**
         * 实体Object
         */
        public Object object = null;

        /**
         * 属性map
         */
        public BeanMap beanMap = null;

        public CglibBean() {
            super();
        }

        @SuppressWarnings("unchecked")
        public CglibBean(Map propertyMap) {
            this.object = generateBean(propertyMap);
            this.beanMap = BeanMap.create(this.object);
        }

        /**
         * 给bean属性赋值
         *
         * @param property 属性名
         * @param value    值
         */
        public void setValue(String property, Object value) {
            beanMap.put(property, value);
        }

        /**
         * 通过属性名得到属性值
         *
         * @param property 属性名
         * @return 值
         */
        public Object getValue(String property) {
            return beanMap.get(property);
        }

        /**
         * 得到该实体bean对象
         *
         * @return
         */
        public Object getObject() {
            return this.object;
        }

        @SuppressWarnings("unchecked")
        private Object generateBean(Map propertyMap) {
            BeanGenerator generator = new BeanGenerator();
            Set keySet = propertyMap.keySet();
            for (Iterator i = keySet.iterator(); i.hasNext(); ) {
                String key = (String) i.next();
                generator.addProperty(key, (Class) propertyMap.get(key));
            }
            return generator.create();
        }
    }

    /**
     * -XX:+PrintGCDetails -XX:PermSize=5m -XX:MaxPermSize=5m
     * -XX:+PrintGCDetails -XX:MetaspaceSize=5m -XX:MaxMetaspaceSize=5m
     */
    public static void main(String[] args) {
        int i = 0;
        try {
            for (i = 0; i < 100000; i++) {
                CglibBean bean = new CglibBean(new HashMap());
            }
        } catch (Throwable e) {
            System.out.println("total create count:" + i);
        }
    }
}
