package org.inspireso.cloud.client.web.api;

import org.inspireso.cloud.client.domain.Customer;
import org.inspireso.cloud.client.service.CustomerClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client")
public class ClientController {
    private static final Logger logger = LoggerFactory.getLogger(ClientController.class);

    @Autowired
    CustomerClient customerClient;

    @RequestMapping(value = "/customer", method = RequestMethod.GET)
    public Customer add() {
        return customerClient.get();
    }

}
