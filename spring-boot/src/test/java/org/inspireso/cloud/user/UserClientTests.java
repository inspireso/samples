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

package org.inspireso.cloud.user;

import java.util.UUID;

import org.inspireso.cloud.user.domain.User;
import org.inspireso.remoting.client.ClusterRemotingClient;
import org.junit.Test;

import com.google.common.base.Optional;


/**
 * Created by lanxe on 2016/3/9.
 */
public class UserClientTests {

    @Test
    public void test() throws InterruptedException {
        UserClient client = new UserClient();
        User customer = new User();
        customer.setId(UUID.randomUUID().toString());
        customer.setName("lanxe");
        customer.setAge(32);
        customer.setPicture("my picture");
        Optional<User> instance = client.create(customer);
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

        instance = client.delete();
        printCustomer(instance);

        instance = client.get();
        printCustomer(instance);


    }

    private void printCustomer(Optional<User> instance) {
        if (instance.isPresent())
            System.out.println(instance.get().toString());
        else {
            System.out.println(":( 没有棒棒糖");
        }
    }

    static class UserClient extends ClusterRemotingClient {
        public UserClient() {
            super("http://192.168.8.104:8762", "SERVICE.CUSTOMER");
        }

        public Optional<User> get() {
            return this.execute(User.class, httpGet(), "user");
        }

        public Optional<User> create(User customer) {
            return this.execute(User.class, httpPost(customer), "user");
        }


        public Optional<User> update(User customer) {
            return this.execute(User.class, httpPut(customer), "user");
        }

        public Optional<User> delete() {
            return this.execute(User.class, httpDelete(), "user");
        }
    }
}
