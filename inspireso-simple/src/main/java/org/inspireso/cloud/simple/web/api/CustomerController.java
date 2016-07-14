package org.inspireso.cloud.simple.web.api;

import org.inspireso.cloud.simple.domain.Customer;
import org.inspireso.cloud.simple.domain.CustomerNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@ControllerAdvice
public class CustomerController {
    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    private Customer instance = new Customer();

    @ExceptionHandler(RuntimeException.class)
    String exceptionHandle(RuntimeException e) {
        return e.getLocalizedMessage();
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/customer")
    Customer get() {
        logger.info("get customer success!");
        if (instance == null)
            throw new CustomerNotFoundException("customer is null");
        return instance;
    }

    @RequestMapping(method = {RequestMethod.PUT}, value = "/customer")
    Customer update(@RequestBody Customer customer) {
        this.instance = customer;
        logger.info("update customer success!{}", customer);
        return instance;
    }

    @RequestMapping(method = {RequestMethod.POST}, value = "/customer")
    Customer newInstance(@RequestBody Customer customer) {
        this.instance = customer;
        logger.info("new customer success!{}", customer);
        return instance;
    }

    @RequestMapping(method = {RequestMethod.DELETE}, value = "/customer")
    Customer delete() {
        Customer old = this.instance;
        this.instance = null;
        logger.info("delete customer success!{}");
        return old;
    }

}
