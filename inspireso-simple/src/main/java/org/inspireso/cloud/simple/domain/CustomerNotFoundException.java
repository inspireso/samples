package org.inspireso.cloud.simple.domain;

/**
 * Created by lanxe on 2016/7/13.
 */
public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException(String message) {
        super(message);
    }
}
