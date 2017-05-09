package org.inspireso.cloud.user.domain;

/**
 * Created by lanxe on 2016/7/13.
 */
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
