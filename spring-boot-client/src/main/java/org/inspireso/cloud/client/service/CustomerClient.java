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
