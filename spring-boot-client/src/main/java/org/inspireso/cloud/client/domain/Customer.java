package org.inspireso.cloud.client.domain;

import com.google.common.base.Objects;

/**
 * Created by lanxe on 2016/7/13.
 */
public class Customer {
    private String id;
    private String name;
    private int age;
    private String picture;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
                .add("id", id)
                .add("name", name)
                .add("age", age)
                .add("picture", picture)
                .toString();
    }
}
