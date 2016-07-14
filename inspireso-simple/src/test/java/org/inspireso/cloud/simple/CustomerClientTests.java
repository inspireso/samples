/*
 * Copyright (c) 2016, Inspireso and/or its affiliates. All rights reserved.
 */

package org.inspireso.cloud.simple;

import java.util.UUID;

import org.inspireso.cloud.simple.domain.Customer;
import org.inspireso.remoting.client.RemotingClient;
import org.junit.Test;

import com.google.common.base.Optional;


/**
 * Created by lanxe on 2016/3/9.
 */
public class CustomerClientTests {

    @Test
    public void test() throws InterruptedException {
        CustomerClient client = new CustomerClient();
        Customer customer = new Customer();
        customer.setId(UUID.randomUUID().toString());
        customer.setName("lanxe");
        customer.setAge(32);
        customer.setPicture("my picture");
        Optional<Customer> instance = client.create(customer);
        printCustomer(instance);

        instance = client.get();
        printCustomer(instance);

        instance = client.get();
        printCustomer(instance);

        customer.setName("XMAN");
        instance = client.update(customer);
        printCustomer(instance);

        instance = client.get();
        printCustomer(instance);

        instance= client.delete();
        printCustomer(instance);

        instance= client.get();
        printCustomer(instance);


    }

    private void printCustomer(Optional<Customer> instance){
        if (instance.isPresent())
            System.out.println(instance.get().toString());
        else{
            System.out.println(":( 没有棒棒糖");
        }
    }

    static class CustomerClient extends RemotingClient {
        public CustomerClient() {
            super("http://192.168.8.104:8761", "SIMPLE.SERVICE");
        }

        public Optional<Customer> get() {
            return this.execute(Customer.class, httpGet(), "customer");
        }

        public Optional<Customer> create(Customer customer) {
            return this.execute(Customer.class, httpPost(customer), "customer");
        }


        public Optional<Customer> update(Customer customer) {
            return this.execute(Customer.class, httpPut(customer), "customer");
        }

        public Optional<Customer> delete() {
            return this.execute(Customer.class, httpDelete(), "customer");
        }
    }
}
