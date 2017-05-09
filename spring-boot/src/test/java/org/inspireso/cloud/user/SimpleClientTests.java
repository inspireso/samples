/*
 * Copyright (c) 2016, Inspireso and/or its affiliates. All rights reserved.
 */

package org.inspireso.cloud.user;

import org.inspireso.remoting.client.RemotingClient;
import org.inspireso.remoting.http.HttpSender;
import org.junit.Test;


/**
 * Created by lanxe on 2016/3/9.
 */
public class SimpleClientTests {

    @Test
    public void test() throws InterruptedException {
        TestClient client = new TestClient();
        for (int i = 0; i < 500; i++) {
            Thread.sleep(5000L);
            System.out.println(client.hello());
        }
        System.out.println(client.hello());
    }

    static class TestClient extends RemotingClient {
        public TestClient() {
            super("http://192.168.8.104:8761", "SIMPLE.SERVICE");
        }

        public String hello() {
            HttpSender.HttpResult result = this.execute(httpGet());
            return result.content;
        }
    }
}
