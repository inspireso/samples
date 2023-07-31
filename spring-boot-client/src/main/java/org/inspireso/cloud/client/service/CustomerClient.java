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

package org.inspireso.cloud.client.service;

import org.inspireso.cloud.client.domain.Customer;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by lanxe on 2017/5/9.
 */
@FeignClient("service.customer")
public interface CustomerClient {

    @RequestMapping(method = {RequestMethod.GET}, value = "/customer")
    Customer get();


    @RequestMapping(method = {RequestMethod.PUT}, value = "/customer")
    Customer update(@RequestBody Customer customer);

    @RequestMapping(method = {RequestMethod.POST}, value = "/customer")
    Customer newInstance(@RequestBody Customer customer);

    @RequestMapping(method = {RequestMethod.DELETE}, value = "/customer")
    Customer delete();
}
