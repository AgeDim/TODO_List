package com.example.backtodo.entity;

public enum Status {
    TODO("To Do"),
    IN_PROGRESS("In progress"),
    COMPLETED("Completed");

    public String getStatus() {
        return status;
    }

    private String status;

    Status(String status){
        this.status = status;
    }
}
