package org.inspireso.cloud.user.web.api;

import java.util.Collection;
import java.util.UUID;
import java.util.concurrent.ConcurrentMap;

import javax.annotation.PostConstruct;

import org.inspireso.cloud.user.domain.User;
import org.inspireso.cloud.user.domain.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import com.google.common.collect.Maps;

@RestController
@RequestMapping("/user")
@ControllerAdvice
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private ConcurrentMap<String, User> store = Maps.newConcurrentMap();

    @PostConstruct
    void init() {
        for (int i = 0; i < 10; i++) {
            User user = new User();
            user.setId(UUID.randomUUID().toString());
            user.setName("spring-boot" + i);
            store.putIfAbsent(user.getId(), user);
        }
    }

    @ExceptionHandler(RuntimeException.class)
    String exceptionHandle(RuntimeException e) {
        return e.getLocalizedMessage();
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<User> findAll() {
        return store.values();
    }

    @RequestMapping(method = {RequestMethod.GET}, path = "/{id}")
    User get(@PathVariable("id") String id) {
        if (!store.containsKey(id))
            throw new UserNotFoundException("user is null");
        logger.info("get user success!");
        return store.get(id);
    }

    @RequestMapping(method = {RequestMethod.DELETE}, path = "/{id}")
    User delete(@PathVariable("id") String id) {
        if (store.containsKey(id)) {
            logger.info("delete user success!{}");
            return store.remove(id);
        }

        return null;
    }

    @RequestMapping(method = {RequestMethod.PUT})
    User update(@RequestBody User user) {
        store.put(user.getId(), user);
        logger.info("update user success!{}", user);
        return user;
    }

    @RequestMapping(method = {RequestMethod.POST})
    User newInstance(@RequestBody User user) {
        user.setId(UUID.randomUUID().toString());
        store.put(user.getId(), user);
        logger.info("new user success!{}", user);
        return user;
    }


}
