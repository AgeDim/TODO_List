package com.example.backtodo.DTO;

public class TaskListAddRequest {

    private String email;

    private String title;
    public String getEmail() {
        return email;
    }

    public void setUser(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


}
