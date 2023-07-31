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
